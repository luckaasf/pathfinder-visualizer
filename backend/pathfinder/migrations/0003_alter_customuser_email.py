# Generated by Django 5.0.3 on 2024-03-20 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pathfinder', '0002_customuser_delete_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=60),
        ),
    ]
