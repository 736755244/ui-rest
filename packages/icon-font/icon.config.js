/*
打开iconfont下载的demo复制粘贴以下代码到控制台获取所有icon的name集合,注意，样式复制过来是iconfont字体大小默认删除

  console.log('获取所有icon name 并用逗号分隔')
  var list = document.querySelectorAll('.content.font-class .icon_lists .dib .code-name')
  var iconList = []
  for (var i = 0; i < list.length ; i++) {
  iconList.push(list[i].innerHTML.slice(6).trim())// 去除.icon- 只获取name
  }
  console.log(iconList.join(','))
*/ 

const iconList = `biaodan,biaoge,baidu1,cuowu,daohanglanmoshi02,bofangqi-suoping,caidanguanli,canshu,add,home,icon_addmessage,changyonglogo27,github,icon_addresslist,gitee2,caidan,cuowutishitubiao,icon_airplay,icon_at,huanyingye,dongtai,addperson,icon_calendar,gongsixinxi,icon_community_line,icon_coinpurse_line,icon_cloud_history,icon_affiliations_li,icon_details,icon_addressbook,icon_alipay_line,icon_dmail,icon_compile,icon_camera,icon_down,icon_doc,icon_discovery,icon_boss,icon_delete,icon_cspace,icon_horn,icon_index_line,icon_exchange,icon_im_more,icon_hardware_fill,icon_im_voice,icon_group,bug,icon_more,icon_glass,icon_mobilephone,icon_message,icon_live,icon_link,icon_launch_page,icon_dispose,debug,icon_GPS,icon_next_arrow,icon_likegood,icon_notice,icon_photo,icon_namecard,icon_im_keyboard,icon_QRcode,icon_im_face,icon_redpacket,icon_left,icon_roundreduce,icon_patriarch,icon_roundclose,icon_attestation,icon_phone,icon_refresh,icon_send,icon_principal,icon_search,icon_scan,icon_roundadd,icon_study,icon_safety,icon_savememo,icon_certificate_fil,icon_sms,icon_secret,iconset0216,icon_work,icon_star,icon_task,iframe,icon_task_done,icon_shakehands,icon_share,icon_setting,icon_scan_namecard,icon_voipphone,liuliangyunpingtaitubiao08,icon_wechat,icon_ding,msnui-360,navicon,icon_subordinate,shouji,quanping,icon_qq,qq1,jiaoseguanli,quanxian,rizhi,suoping,icon_workfile_line,shujuzhanshi2,mima,shuaxin,tuichu,tubiao,yonghu,weixin,tuichuquanping,qq,weixin1,yanjing-bi_0,yanzhengma,yanjing-kai_0,yuan,zhongyingwen,yonghuguanli,rizhi1,wxbgongju,iconset0265,zhuti,yanjing_bi,souhu`
const icons = iconList.split(',')
export default icons
