from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
import json
from django.views.decorators.csrf import csrf_exempt
from wechatpy import parse_message,WeChatClient
from wechatpy.replies import TextReply,ArticlesReply
from wechatpy.utils import ObjectDict
from wechatpy.messages import TextMessage

WEIXIN_TOKEN = 'qinhaoyan'

#微信
client =  WeChatClient('wxaf21737704363547','2891556a09b30c35202e1ef4881eed26')
client.menu.create({
    'button':[
        {
            "type": "scancode_waitmsg",
            "name": "扫一扫条形码",
            "key" : 'isbn_sao'
        },
        {
            "type": "view",
            "name": "青年之声",
            "url": "http://www.qinhaoyan.xin"
        }
    ]
})

@csrf_exempt
def weixin(request):
    """
    所有的消息都会先进入这个函数进行处理，函数包含两个功能，
    微信接入验证是GET方法，
    微信正常的收发消息是用POST方法。
    """
   #此处省略上面的那一段GET请求代码
    if request.method == "GET":
        signature = request.GET.get("signature", None)
        timestamp = request.GET.get("timestamp", None)
        nonce = request.GET.get("nonce", None)
        echostr = request.GET.get("echostr", None)
        token = WEIXIN_TOKEN
        tmp_list = [token, timestamp, nonce]
        tmp_list.sort()
        tmp_str = "%s%s%s" % tuple(tmp_list)
        if tmp_str == signature:
            return HttpResponse(echostr)
        else:
            return HttpResponse(echostr)
    else:
        xml = request.body
        msg = parse_message(xml)
        if msg.type == 'text':
            #获取文本内容
            content = msg.content
            try:
                # 获取唯一标记用户的openid，下文介绍获取用户信息会用到
                openid = msg.source
                user = client.user.get(msg.source)
                '''user{
                    'nickname':'str',
                    'headimgurl':'url'            
                }'''
                cont = '你的昵称是'+user['nickname']
                #回复文本
                reply = TextReply(content=user,message=msg)
                r_xml = reply.render()

                #回复图文
                '''reply = ArticlesReply(message=msg)
                reply.add_article({
                    'title': 'test',
                    'description': 'test',
                    'image': 'http://www.qinhaoyan.xin/static/img/banner.jpg',
                    'url': 'http://xsh.qinhaoyan.xin'
                })
                reply.add_article({
                    'title': '时光机',
                    'description': 'test',
                    'image': 'http://shizhiyue.com:8888/static/img/banner.jpg',
                    'url': 'http://www.shizhiyue.com'
                })
                r_xml = reply.render()'''

                return HttpResponse(r_xml)
            except Exception as e:
                #自行处理
                # reply = TextReply(content='尴尬，服务器好像坏了',message=msg)
                # r_xml = reply.render()
                # return HttpResponse(r_xml)
                pass