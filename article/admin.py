from django.contrib import admin
from article.models import user,article,comment,subcomment,articlelike,IMG

# Register your models here.
admin.site.register(user)
admin.site.register(article)
admin.site.register(comment)
admin.site.register(subcomment)
admin.site.register(articlelike)
admin.site.register(IMG)
