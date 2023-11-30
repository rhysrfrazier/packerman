# Generated by Django 4.2.7 on 2023-11-30 22:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('packerman', '0008_alter_event_item_unpacked_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event_item',
            name='unpacked_by',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='unpacking_user', to='packerman.user'),
        ),
    ]
