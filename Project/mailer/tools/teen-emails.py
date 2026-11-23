# SUPERSEDED (Round 20): the twelve Teen templates are now built from Project/mailer/design-v1/src/emails/teen-set.jsx
# (the v1 email design), with the same copy, merge fields and links. This script is kept for reference only and
# refuses to run, so it cannot overwrite the new templates by accident.
import os, sys
sys.exit('teen-emails.py is superseded: edit Project/mailer/design-v1/src/emails/teen-set.jsx and run npm run build there.')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'register')  # Project/mailer/register/
LOGO = 'https://www.turn2opinion.com/images/logo/t2o-logo.png'
FONT = "'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

def pre(text):
    return f'<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px">{text}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>'

def btn(href, label, bg, fg='#ffffff', border=None, big=False):
    pad = '18px 34px' if big else '15px 30px'
    fs = '19px' if big else '16px'
    bd = f'border:2px solid {border};' if border else ''
    return (f'<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto"><tr><td align="center" bgcolor="{bg}" style="border-radius:14px;{bd}">'
            f'<a href="{href}" target="_blank" style="display:inline-block;padding:{pad};font-family:{FONT};font-size:{fs};font-weight:800;color:{fg};text-decoration:none;border-radius:14px;letter-spacing:.2px">{label}</a></td></tr></table>')

# ---------------- Teen layout: night violet, magenta + cyan + lime (the Teen panel grade) ----------------
def teen(preheader, kicker, title, body, cta='', accent='#ff2e97', emoji='✨'):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>{kicker}</title>
<style>@media (max-width:620px){{.wrap{{width:100%!important}}.px{{padding-left:22px!important;padding-right:22px!important}}.h1{{font-size:26px!important;line-height:32px!important}}}}</style></head>
<body style="margin:0;padding:0;background:#140a2e">{pre(preheader)}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#140a2e" style="background:#140a2e"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" class="wrap" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px;max-width:600px">
<tr><td align="center" style="padding:0 0 18px"><img src="{LOGO}" alt="Turn2Opinion" width="190" style="display:block;max-width:190px;background:#ffffff;border-radius:12px;padding:8px 14px"></td></tr>
<tr><td style="border-radius:26px;background:#1f1147;background-image:linear-gradient(140deg,#2a1263 0%,#1b0f45 55%,#0f2b4f 100%);border:1px solid #3b2a7a">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td height="8" style="font-size:0;line-height:0;border-radius:26px 26px 0 0;background:#ff2e97;background-image:linear-gradient(90deg,#ff2e97,#22e4ff,#c8ff3a)">&nbsp;</td></tr>
<tr><td class="px" style="padding:34px 44px 8px;font-family:{FONT}">
<p style="margin:0 0 14px;font-size:44px;line-height:48px">{emoji}</p>
<p style="margin:0 0 8px;font-size:12px;font-weight:800;letter-spacing:2.4px;text-transform:uppercase;color:{accent}">{kicker}</p>
<h1 class="h1" style="margin:0 0 16px;font-size:30px;line-height:37px;color:#ffffff;font-weight:900">{title}</h1>
</td></tr>
<tr><td class="px" style="padding:0 44px 10px;font-family:{FONT};font-size:16px;line-height:26px;color:#d9d2ff">{body}</td></tr>
{f'<tr><td class="px" align="center" style="padding:18px 44px 8px">{cta}</td></tr>' if cta else ''}
<tr><td class="px" style="padding:22px 44px 30px;font-family:{FONT}">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-radius:14px;background:#140a2e;border:1px dashed #4b3a8f"><tr><td style="padding:14px 18px;font-size:13px;line-height:20px;color:#b9b0e8">
Registration reference: <b style="color:#c8ff3a;letter-spacing:1px">{{{{ ref }}}}</b><br>Your username is your email address. We will never email you a password.
</td></tr></table></td></tr>
</table></td></tr>
<tr><td class="px" style="padding:22px 30px;font-family:{FONT};font-size:12px;line-height:19px;color:#8e86b8" align="center">
Questions? Write to <a href="mailto:support@turn2opinion.com" style="color:#22e4ff">support@turn2opinion.com</a> and quote your reference.<br>
Teen panel members are 13 to 17. We never sell your data, never show you ads in surveys and never ask for your school name or home address.<br>
<a href="{{{{ site }}}}/privacy/" style="color:#8e86b8">Privacy Policy</a> · <a href="{{{{ site }}}}/terms/" style="color:#8e86b8">Terms</a> · <a href="{{{{ site }}}}/earn/teens/" style="color:#8e86b8">How the Teen panel works</a><br>© Turn2Opinion</td></tr>
</table></td></tr></table></body></html>'''

# ---------------- Guardian layout: ink navy on warm paper, a calm letter ----------------
def guardian(preheader, kicker, title, body, cta='', band='#0b2a6f', seal='🛡️'):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>{kicker}</title>
<style>@media (max-width:620px){{.wrap{{width:100%!important}}.px{{padding-left:22px!important;padding-right:22px!important}}.h1{{font-size:24px!important;line-height:31px!important}}.stack{{display:block!important;width:100%!important}}}}</style></head>
<body style="margin:0;padding:0;background:#efe9dc">{pre(preheader)}
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#efe9dc" style="background:#efe9dc"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" class="wrap" width="620" border="0" cellspacing="0" cellpadding="0" bgcolor="#fffdf8" style="width:620px;max-width:620px;background:#fffdf8;border-radius:18px;border:1px solid #e2d8c3">
<tr><td style="padding:0"><table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>
<td bgcolor="{band}" style="background:{band};border-radius:18px 18px 0 0;padding:22px 34px" class="px">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>
<td><img src="{LOGO}" alt="Turn2Opinion" width="170" style="display:block;max-width:170px;background:#ffffff;border-radius:10px;padding:7px 12px"></td>
<td align="right" style="font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#e8dcbc;letter-spacing:1.6px;text-transform:uppercase">Teen panel · Parents &amp; guardians</td>
</tr></table></td></tr></table></td></tr>
<tr><td class="px" style="padding:34px 44px 6px;font-family:Georgia,'Times New Roman',serif">
<p style="margin:0 0 8px;font-family:{FONT};font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#b07a1e">{seal}&nbsp; {kicker}</p>
<h1 class="h1" style="margin:0 0 18px;font-size:28px;line-height:36px;color:#0b2a6f;font-weight:700">{title}</h1></td></tr>
<tr><td class="px" style="padding:0 44px 6px;font-family:{FONT};font-size:16px;line-height:26px;color:#2b3550">{body}</td></tr>
{f'<tr><td class="px" style="padding:16px 44px 6px">{cta}</td></tr>' if cta else ''}
<tr><td class="px" style="padding:20px 44px 30px;font-family:{FONT}">
<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid #e2d8c3"><tr><td style="padding:16px 0 0;font-size:13px;line-height:21px;color:#5d6478">
Registration reference: <b style="color:#0b2a6f;letter-spacing:.8px">{{{{ ref }}}}</b><br>
You are receiving this because a Teen gave this address as their {{{{ relation }}}}. We use it only for this registration, consent and account notices, never for marketing.
Links in this email are personal and time-limited: please do not forward it.<br>
Questions, or want your details removed? <a href="mailto:support@turn2opinion.com" style="color:#0b2a6f">support@turn2opinion.com</a> · <a href="{{{{ site }}}}/privacy/" style="color:#0b2a6f">Privacy Policy</a> · <a href="{{{{ site }}}}/terms/" style="color:#0b2a6f">Terms</a>
</td></tr></table></td></tr>
</table>
<p style="margin:16px 0 0;font-family:{FONT};font-size:12px;color:#8a8170">© Turn2Opinion · Mangolpur Kalan, New Delhi 110085, India</p>
</td></tr></table></body></html>'''

def steps(items, color='#22e4ff', text='#d9d2ff', num_bg='#2d1a6b'):
    rows = ''.join(f'<tr><td width="38" valign="top" style="padding:6px 0"><div style="width:28px;height:28px;border-radius:50%;background:{num_bg};color:{color};font-weight:900;font-size:14px;line-height:28px;text-align:center">{i+1}</div></td><td style="padding:8px 0;color:{text};font-size:15px;line-height:23px">{t}</td></tr>' for i, t in enumerate(items))
    return f'<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:6px 0 4px">{rows}</table>'

def box(html, bg='#f6f1e4', border='#e2d8c3', color='#2b3550'):
    return f'<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:16px 0;border-radius:14px;background:{bg};border:1px solid {border}"><tr><td style="padding:18px 20px;font-size:15px;line-height:24px;color:{color}">{html}</td></tr></table>'

T = {}
# 1 Teen registration confirmation
T['minor-request-child'] = teen(
    'Your Teen registration is in. Next, your parent or guardian decides.',
    'Teen registration received', 'Nice one, {{ user.name.first }}. Your request is in!',
    '<p style="margin:0 0 14px">We saved your registration and sent an invitation to your {{ relation }} at <b style="color:#ffffff">{{ parentMasked }}</b>. They decide whether you can join, then fill in a short onboarding form and a consent form.</p>'
    '<p style="margin:0 0 6px;color:#ffffff;font-weight:800">What happens next</p>'
    + steps(['Your {{ relation }} opens our email and chooses <b style="color:#c8ff3a">Yes</b> or <b>No</b>.', 'If yes, they complete the onboarding and consent forms.', 'We email <b style="color:#ffffff">you</b> a secure link to create your password.', 'You log in with this email address. Your account is switched on.']) +
    '<p style="margin:14px 0 0;color:#ffb3d6"><b>Your account is not active yet.</b> Nothing to do for now. Maybe give your {{ relation }} a heads-up to check their inbox (and spam folder).</p>',
    emoji='🚀')
# 2 Guardian enrolment invitation with YES / NO
T['minor'] = guardian(
    '{{ user.name.first }} asked to join the Turn2Opinion Teen panel. Please choose Yes or No.',
    'Your decision is needed', '{{ user.name.first }} would like to join the Turn2Opinion Teen panel',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }},</p>'
    '<p style="margin:0 0 14px">{{ user.name.first }} has registered for the Turn2Opinion Teen panel and named you as their <b>{{ relation }}</b>. Teens aged 13 to 17 can join only with the permission of a parent or legal guardian, so nothing happens without your decision.</p>'
    + box('<b style="color:#0b2a6f">What the Teen panel is</b><br>Turn2Opinion is a market research panel. Teen members are invited to short, age-appropriate online surveys about things like technology, entertainment, shopping and everyday life, and can earn rewards for completed surveys. Taking part is free and voluntary: your teen can skip any question or stop at any time, and nothing has to be bought.') +
    '<p style="margin:0 0 6px;font-weight:700;color:#0b2a6f">How it works if you say yes</p>'
    + steps(['You review your teen&rsquo;s request and confirm you are their parent or legal guardian.', 'You fill in a short onboarding form about you (about 3 minutes).', 'You read the Teen participation agreement and tick the permissions you give.', 'We email your teen a secure link to create their own password. You get a confirmation.'], color='#0b2a6f', text='#2b3550', num_bg='#f1e6c8') +
    '<p style="margin:18px 0 8px;font-weight:800;color:#0b2a6f;font-size:18px;text-align:center">Do you want to enrol {{ user.name.first }} in the Teen panel?</p>'
    '<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.yes }}", "YES &mdash; I want to enrol my Teen", "#0f7b4a", big=True)}</td>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.no }}", "NO &mdash; I do not want to enrol my Teen", "#ffffff", fg="#9b1c1c", border="#9b1c1c", big=True)}</td>'
    '</tr></table>'
    '<p style="margin:10px 0 0;font-size:13px;color:#5d6478;text-align:center">Both buttons open a secure page where you can confirm your choice. This link expires in 7 days.</p>'
    + box('<b style="color:#0b2a6f">What we will ask you</b><br>Your name, date of birth, country and region, your relationship to the teen, how you prefer to be contacted, and three optional questions about your teen&rsquo;s health that help us keep unsuitable studies away from them. Then three required permissions and three optional ones.', bg='#eef3ff', border='#cfdcff') +
    '<p style="margin:0;font-size:14px;color:#5d6478">Did not expect this email? Choose <b>No</b> and tell us you do not recognise the request. The registration will be closed and no account will be created.</p>',
    seal='✉️')
# 3 Guardian approval confirmation (after YES)
T['teen-parent-approved'] = guardian(
    'Thank you for saying yes. Two short forms left.',
    'Decision recorded: Yes', 'Thank you. Two short steps left',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }}, you chose to enrol {{ user.name.first }} in the Teen panel. To finish, please complete:</p>'
    + steps(['<b>The onboarding form</b>: a few questions about you, about 3 minutes.', '<b>The consent form</b>: the Teen participation agreement and your permissions.'], color='#0b2a6f', text='#2b3550', num_bg='#f1e6c8') +
    '<p style="margin:12px 0 0">If you closed the page, this button takes you back to where you left off.</p>',
    cta=btn('{{ links.open }}', 'Continue the onboarding form', '#0b2a6f'), seal='✅')
# 4 Guardian rejection confirmation
T['teen-parent-declined'] = guardian(
    'Your decision is recorded. No Teen account will be created.',
    'Decision recorded: No', 'We have recorded your decision',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }}, thank you for letting us know. {{ user.name.first }}&rsquo;s Teen registration will not go ahead.</p>'
    + box('<b style="color:#0b2a6f">What this means</b><br>• No Teen account has been activated and no password link will be sent.<br>• {{ user.name.first }} cannot take part in surveys or other panel activities.<br>• We have let {{ user.name.first }} know, without sharing the reasons you gave.') +
    '{% if notRecognised %}<p style="margin:0 0 14px"><b>You told us you did not recognise this request or are not the right guardian.</b> Our team will review it. If you would like the registration details deleted now, reply to support with the reference below.</p>{% endif %}'
    '<p style="margin:0">Changed your mind later? Your teen can register again, and you will receive a new invitation.</p>', seal='📝', band='#3a3f55')
# 5 Guardian onboarding completion
T['minor-permitted-parent'] = guardian(
    'Onboarding and consent complete. Your teen is getting their password link.',
    'Onboarding complete', 'All done. Thank you, {{ user.parent.name.first }}',
    '<p style="margin:0 0 14px">You have completed the onboarding form and given consent for {{ user.name.first }} to join the Turn2Opinion Teen panel. We have sent {{ user.name.first }} a secure link to create their own password.</p>'
    + box('<b style="color:#0b2a6f">Your consent record</b><br>Agreement: <b>{{ record.version | default: "MINOR-2026.10" }}</b><br>Recorded: {{ record.acceptedAt | date: "%d %B %Y, %H:%M UTC" }}<br>'
          'Required permissions: participation, privacy notice, contact by email<br>'
          'Optional: study contact {% if record.selections.studyContact %}yes{% else %}no{% endif %} · recordings {% if record.selections.recording %}yes{% else %}no{% endif %} · sensitive topics {% if record.selections.sensitive %}yes{% else %}no{% endif %}') +
    '<p style="margin:0 0 14px">You can withdraw consent, change the optional permissions or ask us to delete {{ user.name.first }}&rsquo;s account at any time by writing to support with the reference below. Your teen&rsquo;s account and your guardian record are kept separately.</p>', seal='🏅', band='#0f5a46')
# 6 Teen password creation invitation
T['minor-permitted-child'] = teen(
    'Your parent or guardian said yes. Create your password to switch on your account.',
    'You are approved', '{{ user.name.first }}, you are in! Create your password',
    '<p style="margin:0 0 14px">Your {{ relation }} has completed the onboarding and consent forms. The last step is yours: choose a password and your Teen account switches on.</p>'
    + box('<span style="color:#ffffff"><b>Your username</b> is your email address: <b style="color:#c8ff3a">{{ user.mail }}</b><br>The button works once and for 7 days. Expired? Use &ldquo;Forgot password&rdquo; on the login page or ask support for a new one.</span>', bg='#140a2e', border='#4b3a8f'),
    cta=btn('{% if activate %}{{ activate }}{% else %}{{ site }}/join/teen/?user={{ user._id }}&code={{ otp.code }}&s={{ otp.sig }}&activate=1{% endif %}', 'Create my password 🔑', '#ff2e97', big=True), emoji='🔓')
# 7 Teen account activation confirmation
T['teen-activated-child'] = teen(
    'Your Teen account is active. Log in with your email address.',
    'Account active', 'Your Teen account is switched on 🎉',
    '<p style="margin:0 0 14px">Your password is set. Log in any time with <b style="color:#ffffff">{{ user.mail }}</b> and the password you chose.</p>'
    '<p style="margin:0 0 6px;color:#ffffff;font-weight:800">First time in</p>'
    + steps(['A few quick welcome questions (we skip everything you already told us).', 'Your profile studio: fill in topics you like, whenever you want.', 'Survey invitations that fit your age. Skip any question, stop any time.']) ,
    cta=btn('{{ site }}/login/', 'Log in now', '#22e4ff', fg='#140a2e'), emoji='🎉', accent='#c8ff3a')
# 8 Teen pending reminder
T['teen-pending-reminder-child'] = teen(
    'Still waiting for your parent or guardian. Give them a nudge?',
    'Still pending', 'Still waiting for your {{ relation }}',
    '<p style="margin:0 0 14px">Your {{ relation }} hasn&rsquo;t finished the Teen panel forms yet, so your account is still switched off. We&rsquo;ve sent them a reminder at <b style="color:#ffffff">{{ parentMasked }}</b>.</p>'
    '<p style="margin:0">Ask them to look for an email from Turn2Opinion (check spam too). Wrong address? Write to support with your reference and we&rsquo;ll help.</p>', emoji='⏳', accent='#22e4ff')
# Teen: registration cannot proceed
T['teen-declined-child'] = teen(
    'An update on your Teen registration.',
    'Registration update', 'Your Teen registration can&rsquo;t go ahead right now',
    '<p style="margin:0 0 14px">Hi {{ user.name.first }}. Your {{ relation }} decided not to enrol you in the Teen panel at this time, so we haven&rsquo;t created an account and won&rsquo;t send a password link.</p>'
    '<p style="margin:0">That&rsquo;s completely okay. If things change, you can talk it through together and register again. When you turn 18 you can join the adult panel on your own.</p>', emoji='💬', accent='#22e4ff')
# 9 Guardian onboarding reminder
T['teen-onboarding-reminder'] = guardian(
    'A reminder: {{ user.name.first }} is waiting for your decision.',
    'Friendly reminder', '{% if user.parent.decision == "yes" %}Please finish {{ user.name.first }}&rsquo;s enrolment{% else %}{{ user.name.first }} is waiting for your decision{% endif %}',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }},</p>'
    '{% if user.parent.decision == "yes" %}<p style="margin:0 0 14px">You chose to enrol {{ user.name.first }} in the Teen panel. The {% if user.parent.onboardingAt %}consent form is{% else %}onboarding and consent forms are{% endif %} still open. It takes a few minutes.</p>'
    f'{btn("{{ links.open }}", "Continue where I left off", "#0b2a6f")}'
    '{% else %}<p style="margin:0 0 14px">{{ user.name.first }} asked to join the Turn2Opinion Teen panel and named you as their {{ relation }}. Please let us know your decision.</p>'
    '<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.yes }}", "YES &mdash; enrol my Teen", "#0f7b4a")}</td>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.no }}", "NO &mdash; do not enrol", "#ffffff", fg="#9b1c1c", border="#9b1c1c")}</td>'
    '</tr></table>{% endif %}'
    '<p style="margin:14px 0 0;font-size:14px;color:#5d6478">This is a new link: earlier links no longer work. We send at most three reminders.</p>', seal='🔔')
# 10 Link expiration / renewal
T['teen-link-renewed'] = guardian(
    'Your earlier link expired. Here is a fresh one.',
    'New link', 'Here is a fresh link for {{ user.name.first }}&rsquo;s registration',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }}, for your teen&rsquo;s safety our registration links stop working after 7 days. The earlier link has expired, so here is a new one. It also lasts 7 days.</p>'
    '<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.yes }}", "YES &mdash; I want to enrol my Teen", "#0f7b4a")}</td>'
    f'<td class="stack" width="50%" style="padding:8px">{btn("{{ links.no }}", "NO &mdash; I do not want to enrol my Teen", "#ffffff", fg="#9b1c1c", border="#9b1c1c")}</td>'
    '</tr></table>'
    '<p style="margin:14px 0 0;font-size:14px;color:#5d6478">Already said yes? The Yes button takes you back to your forms. If you did not ask for a new link, you can ignore this email.</p>', seal='⏰')
# existing: account active (to the guardian)
T['minor-activated-parent'] = guardian(
    '{{ user.name.first }} has created their password. The Teen account is active.',
    'Account active', '{{ user.name.first }}&rsquo;s Teen account is now active',
    '<p style="margin:0 0 14px">Dear {{ user.parent.name.first }}, {{ user.name.first }} has created their own password, so the Teen account you approved is now active.</p>'
    + box('• {{ user.name.first }} logs in with their own email address and password. You never need their password.<br>• Every study is age-checked, and some need your separate permission first.<br>• You can withdraw consent or ask us to delete the account at any time.') , seal='🔐', band='#0f5a46')

for name, html in T.items():
    open(os.path.join(OUT, name + '.liquid'), 'w').write(html + '\n')
print(len(T), 'templates')
