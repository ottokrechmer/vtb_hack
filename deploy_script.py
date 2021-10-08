#!/usr/bin/env python3

import os
import random

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vtb_hack.settings')

django.setup()


def main_f():
    from django.contrib.auth import get_user_model
    from django.contrib.auth.models import Permission, Group

    User = get_user_model()
    if User.objects.filter(username='admin').exists():
        print('admin is here')
    else:
        User.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        print('admin created')

    group, group_created = Group.objects.get_or_create(
        name='main_group'
    )

    if group_created:
        permissions = Permission.objects.all()
        for p in permissions:
            group.permissions.add(p)
        print('Permissions granted')


if __name__ == '__main__':
    main_f()
