from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile


class SignupSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    role = serializers.ChoiceField(
        choices=['ADMIN', 'MEMBER'],
        default='MEMBER'
    )

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

    def create(self, validated_data):

        role = validated_data.pop('role')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        Profile.objects.create(
            user=user,
            role=role
        )

        return user