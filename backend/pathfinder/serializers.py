from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.models import User
from .models import Grid
class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'error': 'Username already exists'})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'Email already exists'})
        if len(data['username']) < 4:
            raise serializers.ValidationError({'error': 'Username should have at least 4 characters'})
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'error': 'Passwords are not matching'})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        CustomUser.objects.create(user=user, username=validated_data['username'], email=validated_data['email'])
        return user
    
class GridSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grid
        fields = ('id', 'grid_name', 'user', 'image', 'algorithm', 'maze', 'speed')

    def create(self, validated_data):
        custom_user_id = validated_data.pop('user')
        custom_user = get_object_or_404(CustomUser, id=custom_user_id)
        validated_data['user'] = custom_user
        return Grid.objects.create(**validated_data)
    