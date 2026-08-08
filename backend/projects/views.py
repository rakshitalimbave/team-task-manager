from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        return Project.objects.filter(
            members=user
        ) | Project.objects.filter(
            created_by=user
        )

    def perform_create(self, serializer):

        project = serializer.save(
            created_by=self.request.user
        )

        project.members.add(
            self.request.user
        )