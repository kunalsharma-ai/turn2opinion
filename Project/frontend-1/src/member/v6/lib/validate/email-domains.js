/* Disposable / temporary inbox providers (blocked) and free webmail providers (fine for consumers,
   flagged when given as a "work email"). Extend these lists from your own fraud history; the server
   can also load a full community list (e.g. github.com/disposable-email-domains) at start-up. */
export const DISPOSABLE = new Set(`
mailinator.com mailinator.net mailinator.org 10minutemail.com 10minutemail.net 10minutemail.co.uk 20minutemail.com 33mail.com guerrillamail.com
guerrillamail.net guerrillamail.org guerrillamail.biz guerrillamail.de guerrillamailblock.com sharklasers.com grr.la pokemail.net spam4.me yopmail.com
yopmail.net yopmail.fr cool.fr.nf jetable.fr.nf nospam.ze.tc nomail.xl.cx mega.zik.dj speed.1s.fr courriel.fr.nf moncourrier.fr.nf monemail.fr.nf
monmail.fr.nf tempmail.com temp-mail.org temp-mail.io tempmail.net tempmailo.com tempmail.plus tempmailaddress.com tempinbox.com tempr.email
throwawaymail.com trashmail.com trashmail.net trashmail.de trashmail.io trashmail.me trash-mail.com trashmail.ws dispostable.com disposablemail.com
getnada.com nada.email maildrop.cc mailnesia.com mailcatch.com mintemail.com mohmal.com emailondeck.com fakeinbox.com fakemail.net fake-mail.net
spambox.us spamgourmet.com spamex.com mytemp.email tempail.com tmail.ws tmpmail.org tmpmail.net emailfake.com email-fake.com burnermail.io
inboxkitten.com mailpoof.com moakt.com mailsac.com mailtothis.com mailforspam.com mvrht.com dropmail.me 1secmail.com 1secmail.net 1secmail.org
wwjmp.com esiix.com xojxe.com yoggm.com kzccv.com qiott.com vjuum.com laafd.com txcct.com guerrillamail.info mail.tm mail.gw eyepaste.com
anonbox.net anonymbox.com bugmenot.com deadaddress.com discard.email discardmail.com discardmail.de dodgit.com e4ward.com easytrashmail.com
emailsensei.com fakemailgenerator.com filzmail.com gishpuppy.com harakirimail.com incognitomail.com jetable.org kasmail.com klzlk.com
mailexpire.com mailinater.com mailmetrash.com mailmoat.com mailnull.com mailshell.com mailzilla.com meltmail.com mt2015.com mytrashmail.com
no-spam.ws noclickemail.com nowmymail.com objectmail.com onewaymail.com owlpic.com proxymail.eu punkass.com rcpt.at rmqkr.net
safetymail.info selfdestructingmail.com sendspamhere.com shieldemail.com slopsbox.com sneakemail.com sofort-mail.de spamavert.com spambog.com
spamcero.com spamfree24.org spamhole.com spaml.com spamspot.com spamthis.co.uk tempemail.net tempomail.fr temporaryinbox.com thankyou2010.com
trbvm.com twinmail.de uggsrock.com wegwerfmail.de wegwerfmail.net wh4f.org whyspam.me willselfdestruct.com wuzupmail.net yuurok.com zehnminutenmail.de
zippymail.info zoemail.org minutemail.com guerillamail.com 0-mail.com 0815.ru 0clickemail.com 10mail.org 4warding.com 675hosting.com
emltmp.com luxusmail.org tempm.com crazymailing.com mailtemp.info inboxbear.com fexpost.com fexbox.org mailbox.in.ua byom.de linshiyouxiang.net
`.trim().split(/\s+/));

export const FREE_MAIL = new Set(`
gmail.com googlemail.com yahoo.com yahoo.co.in yahoo.co.uk yahoo.fr yahoo.de yahoo.es yahoo.it yahoo.co.jp ymail.com rocketmail.com hotmail.com
hotmail.co.uk hotmail.fr hotmail.de hotmail.it hotmail.es outlook.com outlook.in outlook.fr outlook.de live.com live.in live.co.uk msn.com icloud.com me.com
mac.com aol.com aim.com proton.me protonmail.com pm.me gmx.com gmx.de gmx.net gmx.at web.de mail.com email.com zoho.com zohomail.in yandex.com
yandex.ru ya.ru mail.ru inbox.ru list.ru bk.ru rambler.ru rediffmail.com qq.com 163.com 126.com yeah.net sina.com sohu.com aliyun.com naver.com
daum.net hanmail.net kakao.com laposte.net orange.fr free.fr sfr.fr wanadoo.fr libero.it virgilio.it tiscali.it alice.it t-online.de freenet.de
seznam.cz wp.pl o2.pl interia.pl onet.pl tutanota.com tuta.io fastmail.com hushmail.com uol.com.br bol.com.br terra.com.br ig.com.br
`.trim().split(/\s+/));
