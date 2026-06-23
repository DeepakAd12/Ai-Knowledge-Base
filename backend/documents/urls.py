from django.urls import path
from .views import (
    DeleteDocumentView,
    HealthCheck,
    StatsView,
    SummaryView,
    UploadDocument,
    AskQuestion,
    DocumentListView,
    FlashcardView,
)

urlpatterns = [
    path('health/', HealthCheck.as_view()),
    path('upload/', UploadDocument.as_view()),
    path('ask/', AskQuestion.as_view()),
    path('documents/', DocumentListView.as_view()),
    path('documents/<int:pk>/delete/', DeleteDocumentView.as_view()),
    path('flashcards/', FlashcardView.as_view()),
    path('summary/', SummaryView.as_view()),
    path("stats/",StatsView.as_view()),

]
