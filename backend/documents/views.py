from operator import index
from django.shortcuts import render
from httpx import request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from torch import embedding
from .serializers import DocumentSerializer
from .models import Document, Chunk
from .utils import create_embedding, extract_pdf_text,split_text
from .utils import search_chunks
from rest_framework.generics import ListAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import generate_flashcards,generate_summary
from rest_framework.permissions import IsAuthenticated
from .utils import (
    search_chunks,
    ask_gemini
)

class HealthCheck(APIView):
    def get(self, request):
        return Response({
            "status": "success",
            "message": "Backend is working"
        })
class UploadDocument(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = DocumentSerializer(
            data=request.data
        )

        if serializer.is_valid():

            document = serializer.save(user=request.user)
            # print("UPLOAD STARTED")
            text = extract_pdf_text(
                document.file.path
            )
            # print("TEXT LENGTH:", len(text))
            # print(text[:500])

            document.extracted_text = text
            document.save()

            chunks = split_text(text)

            # print("Chunks:", len(chunks))
            chunks = split_text(text)

            if not chunks:

                return Response(
                    {"error": "No text could be extracted from PDF"},
                    status=400
                )
            for index, chunk_text in enumerate(chunks):

                    embedding = create_embedding(
                        chunk_text
                    )

                    Chunk.objects.create(
                        document=document,
                        content=chunk_text,
                        chunk_index=index,
                        embedding=embedding
                    )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class AskQuestion(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        question = request.data.get(
            "question"
        )

        results = search_chunks(
            question,
            top_k=5
        )

        context = "\n\n".join(
            [
                chunk.content
                for score, chunk in results
            ]
        )

        answer = ask_gemini(
            question,
            context
        )

        return Response({
    "question": question,
    "answer": answer,
    "sources": [
        {
            "document": chunk.document.title,
            "chunk": chunk.chunk_index
        }
        for score, chunk in results
    ]
})
class DocumentListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DocumentSerializer

    def get_queryset(self):
       
        return Document.objects.filter(user=self.request.user)

class DeleteDocumentView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(
            user=self.request.user
        )

class FlashcardView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        document_id = request.data.get(
            "document_id"
        )

        chunks = Chunk.objects.filter(
            document_id=document_id
        )[:5]

        context = "\n".join(
            [chunk.content for chunk in chunks]
        )

        flashcards = generate_flashcards(
            context
        )

        return Response({
            "flashcards": flashcards
        })

class SummaryView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        document_id = request.data.get(
            "document_id"
        )

        chunks = Chunk.objects.filter(
            document_id=document_id
        )[:10]

        context = "\n".join(
            [chunk.content for chunk in chunks]
        )

        summary = generate_summary(
            context
        )
        print(context)

        return Response({
            "summary": summary
        })

class StatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        documents = Document.objects.filter(
            user=request.user
        )

        chunks = Chunk.objects.filter(
            document__user=request.user
        )

        return Response({
            "documents": documents.count(),
            "chunks": chunks.count(),
        })

