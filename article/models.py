from django.db import models

# Create your models here.
class user(models.Model):
    name = models.CharField(max_length = 20, unique = True)
    student_id = models.CharField(max_length = 10, unique = True)
    nickname = models.CharField(max_length = 20, blank = True)
    head = models.ImageField(upload_to='img')
    password = models.CharField(max_length = 20)
    

class IMG(models.Model):
    img = models.ImageField(upload_to='img')
    img_name = models.CharField(max_length=20)

class article(models.Model):
    article = models.TextField()
    user = models.CharField(max_length = 20)
    liken = models.CharField(max_length = 20)
    noname = models.CharField(max_length = 20)
    commentn = models.CharField(max_length = 20)
    time = models.CharField(max_length = 20)
    solved = models.CharField(max_length = 20)
   # img = models.ImageField(upload_to='img')

class comment(models.Model):
    article_id = models.CharField(max_length = 20)
    user = models.CharField(max_length = 20)
    user_id = models.CharField(max_length = 20)
    user2 = models.CharField(max_length = 20)
    user2_id = models.CharField(max_length = 20)
    time = models.CharField(max_length = 20)
    content = models.TextField()

class subcomment(models.Model):
    comment_id = models.CharField(max_length = 20)
    user = models.CharField(max_length = 20)
    user_id = models.CharField(max_length = 20)
    user2 = models.CharField(max_length = 20)
    user2_id = models.CharField(max_length = 20)
    time = models.CharField(max_length = 20)
    content = models.TextField()

class articlelike(models.Model):
    user2_id = models.CharField(max_length = 20)
    user_id = models.CharField(max_length = 20)
    article_id = models.CharField(max_length = 20)
    time = models.CharField(max_length = 20)

