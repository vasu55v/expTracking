# Generated by Django 4.2.7 on 2025-01-05 09:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('track', '0002_product_description_mainusermodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='track.mainusermodel'),
        ),
    ]
