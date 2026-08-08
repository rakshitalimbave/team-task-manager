from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    created_by = serializers.ReadOnlyField(
        source="created_by.username"
    )

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "project",
            "assigned_to",
            "created_by",
            "status",
            "due_date",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
        ]