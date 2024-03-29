# Generated by Django 5.0.3 on 2024-03-25 11:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pathfinder', '0003_alter_customuser_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grid_name', models.CharField(max_length=100)),
                ('grid_data', models.JSONField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grids', to='pathfinder.customuser')),
            ],
        ),
    ]
