export const emailActivityData = [
  { date: 'Jan 1', sent: 4200, delivered: 3980, opened: 1850, clicked: 420, bounced: 120, failed: 100 },
  { date: 'Jan 2', sent: 5100, delivered: 4890, opened: 2100, clicked: 510, bounced: 95, failed: 115 },
  { date: 'Jan 3', sent: 3800, delivered: 3650, opened: 1600, clicked: 380, bounced: 88, failed: 62 },
  { date: 'Jan 4', sent: 6200, delivered: 5980, opened: 2600, clicked: 680, bounced: 110, failed: 110 },
  { date: 'Jan 5', sent: 7100, delivered: 6850, opened: 3100, clicked: 790, bounced: 130, failed: 120 },
  { date: 'Jan 6', sent: 4500, delivered: 4320, opened: 1900, clicked: 450, bounced: 98, failed: 82 },
  { date: 'Jan 7', sent: 5800, delivered: 5610, opened: 2450, clicked: 590, bounced: 105, failed: 85 },
  { date: 'Jan 8', sent: 6900, delivered: 6650, opened: 2900, clicked: 710, bounced: 125, failed: 125 },
  { date: 'Jan 9', sent: 7800, delivered: 7500, opened: 3300, clicked: 820, bounced: 140, failed: 160 },
  { date: 'Jan 10', sent: 8200, delivered: 7900, opened: 3500, clicked: 880, bounced: 150, failed: 150 },
  { date: 'Jan 11', sent: 6100, delivered: 5880, opened: 2550, clicked: 620, bounced: 112, failed: 108 },
  { date: 'Jan 12', sent: 9100, delivered: 8750, opened: 3800, clicked: 960, bounced: 160, failed: 190 },
  { date: 'Jan 13', sent: 8600, delivered: 8280, opened: 3600, clicked: 910, bounced: 148, failed: 172 },
  { date: 'Jan 14', sent: 7300, delivered: 7050, opened: 3050, clicked: 760, bounced: 132, failed: 118 },
];

export const monthlyData = [
  { month: 'Aug', sent: 145000, delivered: 138200, opened: 58400, clicked: 14200 },
  { month: 'Sep', sent: 162000, delivered: 154800, opened: 65200, clicked: 16100 },
  { month: 'Oct', sent: 178000, delivered: 170100, opened: 71800, clicked: 18200 },
  { month: 'Nov', sent: 195000, delivered: 186600, opened: 78500, clicked: 20100 },
  { month: 'Dec', sent: 210000, delivered: 200800, opened: 85200, clicked: 22400 },
  { month: 'Jan', sent: 228000, delivered: 218400, opened: 92100, clicked: 24800 },
];

export const providerData = [
  { name: 'Amazon SES', value: 42, color: '#FF9900' },
  { name: 'SendGrid', value: 28, color: '#1A82E2' },
  { name: 'Mailgun', value: 16, color: '#F06B26' },
  { name: 'Brevo', value: 9, color: '#0B996E' },
  { name: 'SMTP', value: 5, color: '#6B7280' },
];

export const deviceData = [
  { name: 'Desktop', value: 48, color: '#4F46E5' },
  { name: 'Mobile', value: 38, color: '#0EA5E9' },
  { name: 'Tablet', value: 14, color: '#F59E0B' },
];

export const deliveryStatsData = [
  { name: 'Delivered', value: 95.8, color: '#22C55E' },
  { name: 'Bounced', value: 2.1, color: '#F59E0B' },
  { name: 'Failed', value: 1.4, color: '#EF4444' },
  { name: 'Spam', value: 0.7, color: '#6B7280' },
];

export const domains = [
  { id: 1, domain: 'mail.acme.com', spf: 'valid', dkim: 'valid', verified: true, provider: 'Amazon SES', dailyLimit: 50000, status: 'active', sent: 12400 },
  { id: 2, domain: 'noreply.techcorp.io', spf: 'valid', dkim: 'valid', verified: true, provider: 'SendGrid', dailyLimit: 25000, status: 'active', sent: 8100 },
  { id: 3, domain: 'notifications.startup.co', spf: 'invalid', dkim: 'pending', verified: false, provider: 'Mailgun', dailyLimit: 10000, status: 'pending', sent: 0 },
  { id: 4, domain: 'updates.enterprise.net', spf: 'valid', dkim: 'valid', verified: true, provider: 'Brevo', dailyLimit: 100000, status: 'active', sent: 45200 },
  { id: 5, domain: 'alerts.saasapp.dev', spf: 'valid', dkim: 'invalid', verified: false, provider: 'SMTP', dailyLimit: 5000, status: 'error', sent: 0 },
  { id: 6, domain: 'campaigns.bigbrand.com', spf: 'valid', dkim: 'valid', verified: true, provider: 'Amazon SES', dailyLimit: 200000, status: 'active', sent: 98700 },
];

export const smtpProviders = [
  { id: 1, name: 'Amazon SES', host: 'email-smtp.us-east-1.amazonaws.com', port: 587, username: 'AKIAIOSFODNN7EXAMPLE', status: 'connected', logo: '🟠', tls: true, emails: 142000 },
  { id: 2, name: 'SendGrid', host: 'smtp.sendgrid.net', port: 587, username: 'apikey', status: 'connected', logo: '🔵', tls: true, emails: 89400 },
  { id: 3, name: 'Mailgun', host: 'smtp.mailgun.org', port: 587, username: 'postmaster@mg.domain.com', status: 'connected', logo: '🟤', tls: true, emails: 52100 },
  { id: 4, name: 'Brevo', host: 'smtp-relay.brevo.com', port: 587, username: 'user@example.com', status: 'disconnected', logo: '🟢', tls: true, emails: 28600 },
  { id: 5, name: 'Gmail SMTP', host: 'smtp.gmail.com', port: 465, username: 'noreply@company.com', status: 'connected', logo: '🔴', tls: true, emails: 15200 },
];

export const templates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to {{company_name}}!', variables: 4, updated: '2025-01-12', status: 'published', category: 'Transactional', opens: 68.2 },
  { id: 2, name: 'Password Reset', subject: 'Reset your password', variables: 2, updated: '2025-01-10', status: 'published', category: 'Transactional', opens: 82.4 },
  { id: 3, name: 'Monthly Newsletter', subject: '{{month}} Updates from {{company}}', variables: 6, updated: '2025-01-08', status: 'draft', category: 'Marketing', opens: 24.6 },
  { id: 4, name: 'Order Confirmation', subject: 'Order #{{order_id}} Confirmed', variables: 8, updated: '2025-01-11', status: 'published', category: 'Transactional', opens: 91.3 },
  { id: 5, name: 'Invoice Ready', subject: 'Your invoice for {{period}} is ready', variables: 5, updated: '2025-01-09', status: 'published', category: 'Billing', opens: 76.8 },
  { id: 6, name: 'Re-engagement Campaign', subject: 'We miss you, {{first_name}}!', variables: 3, updated: '2025-01-07', status: 'draft', category: 'Marketing', opens: 18.2 },
  { id: 7, name: 'Shipping Notification', subject: 'Your order is on its way!', variables: 7, updated: '2025-01-13', status: 'published', category: 'Transactional', opens: 88.5 },
  { id: 8, name: 'Trial Expiry Reminder', subject: '{{days}} days left on your trial', variables: 3, updated: '2025-01-06', status: 'published', category: 'Lifecycle', opens: 72.1 },
];

export const contacts = [
  { id: 1, name: 'Alice Johnson', email: 'alice@acme.com', phone: '+1 555-0101', tags: ['VIP', 'Customer'], status: 'subscribed', lastEmail: '2025-01-12', avatar: 'AJ' },
  { id: 2, name: 'Bob Martinez', email: 'bob.m@techcorp.io', phone: '+1 555-0102', tags: ['Lead'], status: 'subscribed', lastEmail: '2025-01-11', avatar: 'BM' },
  { id: 3, name: 'Carol White', email: 'carol@startup.co', phone: '+1 555-0103', tags: ['Customer', 'Beta'], status: 'unsubscribed', lastEmail: '2024-12-28', avatar: 'CW' },
  { id: 4, name: 'David Kim', email: 'd.kim@enterprise.net', phone: '+1 555-0104', tags: ['Enterprise', 'VIP'], status: 'subscribed', lastEmail: '2025-01-13', avatar: 'DK' },
  { id: 5, name: 'Eva Chen', email: 'eva.chen@saas.dev', phone: '+1 555-0105', tags: ['Trial'], status: 'bounced', lastEmail: '2025-01-05', avatar: 'EC' },
  { id: 6, name: 'Frank Torres', email: 'frank@bigbrand.com', phone: '+1 555-0106', tags: ['Customer'], status: 'subscribed', lastEmail: '2025-01-12', avatar: 'FT' },
  { id: 7, name: 'Grace Lee', email: 'g.lee@partner.org', phone: '+1 555-0107', tags: ['Partner', 'VIP'], status: 'subscribed', lastEmail: '2025-01-10', avatar: 'GL' },
  { id: 8, name: 'Henry Wilson', email: 'hwilson@client.co', phone: '+1 555-0108', tags: ['Lead', 'Trial'], status: 'subscribed', lastEmail: '2025-01-09', avatar: 'HW' },
];

export const campaigns = [
  { id: 1, name: 'January Newsletter', template: 'Monthly Newsletter', recipients: 12400, scheduled: '2025-01-15 09:00', status: 'scheduled', progress: 0 },
  { id: 2, name: 'Black Friday 2024', template: 'Promotional Blast', recipients: 48200, scheduled: '2024-11-29 08:00', status: 'completed', progress: 100 },
  { id: 3, name: 'Product Launch Alpha', template: 'Announcement', recipients: 8900, scheduled: '2025-01-10 10:00', status: 'sending', progress: 67 },
  { id: 4, name: 'Win-back Campaign', template: 'Re-engagement Campaign', recipients: 3200, scheduled: '2025-01-14 14:00', status: 'paused', progress: 23 },
  { id: 5, name: 'Q1 Report Summary', template: 'Monthly Newsletter', recipients: 6700, scheduled: '2025-01-20 09:00', status: 'draft', progress: 0 },
  { id: 6, name: 'Holiday Greetings', template: 'Welcome Email', recipients: 22100, scheduled: '2024-12-24 08:00', status: 'completed', progress: 100 },
];

export const emailQueue = [
  { id: 'Q-001842', recipient: 'alice@acme.com', provider: 'Amazon SES', priority: 'high', attempts: 1, status: 'processing', scheduled: '2025-01-14 12:01', subject: 'Order Confirmed' },
  { id: 'Q-001843', recipient: 'bob.m@techcorp.io', provider: 'SendGrid', priority: 'normal', attempts: 0, status: 'pending', scheduled: '2025-01-14 12:02', subject: 'Monthly Newsletter' },
  { id: 'Q-001844', recipient: 'carol@startup.co', provider: 'Mailgun', priority: 'normal', attempts: 3, status: 'retrying', scheduled: '2025-01-14 11:45', subject: 'Password Reset' },
  { id: 'Q-001845', recipient: 'd.kim@enterprise.net', provider: 'Amazon SES', priority: 'high', attempts: 1, status: 'success', scheduled: '2025-01-14 11:55', subject: 'Invoice Ready' },
  { id: 'Q-001846', recipient: 'eva.chen@saas.dev', provider: 'Brevo', priority: 'low', attempts: 5, status: 'failed', scheduled: '2025-01-14 11:30', subject: 'Trial Expiry' },
  { id: 'Q-001847', recipient: 'frank@bigbrand.com', provider: 'SendGrid', priority: 'normal', attempts: 0, status: 'pending', scheduled: '2025-01-14 12:05', subject: 'Shipping Notice' },
  { id: 'Q-001848', recipient: 'g.lee@partner.org', provider: 'Amazon SES', priority: 'high', attempts: 1, status: 'success', scheduled: '2025-01-14 11:58', subject: 'Welcome Email' },
  { id: 'Q-001849', recipient: 'hwilson@client.co', provider: 'Mailgun', priority: 'normal', attempts: 2, status: 'retrying', scheduled: '2025-01-14 11:40', subject: 'Re-engagement' },
];

export const emailLogs = [
  { id: 'MSG-9921', recipient: 'alice@acme.com', subject: 'Order #ORD-8821 Confirmed', template: 'Order Confirmation', provider: 'Amazon SES', messageId: '<msg.9921@ses.amazonaws.com>', status: 'delivered', deliveryTime: '0.8s', opened: true, clicked: true, time: '12:01 PM' },
  { id: 'MSG-9920', recipient: 'bob.m@techcorp.io', subject: 'January Newsletter', template: 'Monthly Newsletter', provider: 'SendGrid', messageId: '<msg.9920@sg.net>', status: 'delivered', deliveryTime: '1.2s', opened: false, clicked: false, time: '12:00 PM' },
  { id: 'MSG-9919', recipient: 'carol@startup.co', subject: 'Reset your password', template: 'Password Reset', provider: 'Mailgun', messageId: '<msg.9919@mg.org>', status: 'bounced', deliveryTime: '—', opened: false, clicked: false, time: '11:58 AM' },
  { id: 'MSG-9918', recipient: 'd.kim@enterprise.net', subject: 'Your invoice for Dec 2024', template: 'Invoice Ready', provider: 'Amazon SES', messageId: '<msg.9918@ses.amazonaws.com>', status: 'delivered', deliveryTime: '0.6s', opened: true, clicked: false, time: '11:55 AM' },
  { id: 'MSG-9917', recipient: 'eva.chen@saas.dev', subject: '3 days left on your trial', template: 'Trial Expiry', provider: 'Brevo', messageId: '<msg.9917@brevo.com>', status: 'failed', deliveryTime: '—', opened: false, clicked: false, time: '11:30 AM' },
  { id: 'MSG-9916', recipient: 'frank@bigbrand.com', subject: 'Your order is on its way!', template: 'Shipping Notification', provider: 'SendGrid', messageId: '<msg.9916@sg.net>', status: 'delivered', deliveryTime: '0.9s', opened: true, clicked: true, time: '11:20 AM' },
  { id: 'MSG-9915', recipient: 'g.lee@partner.org', subject: 'Welcome to MailFlow!', template: 'Welcome Email', provider: 'Amazon SES', messageId: '<msg.9915@ses.amazonaws.com>', status: 'delivered', deliveryTime: '1.1s', opened: true, clicked: false, time: '11:10 AM' },
  { id: 'MSG-9914', recipient: 'hwilson@client.co', subject: 'We miss you, Henry!', template: 'Re-engagement', provider: 'Mailgun', messageId: '<msg.9914@mg.org>', status: 'spam', deliveryTime: '2.1s', opened: false, clicked: false, time: '10:55 AM' },
];

export const apiKeys = [
  { id: 1, name: 'Production Key', key: 'mf_live_••••••••••••••••4k2p', permissions: ['send', 'read', 'manage'], created: '2024-08-01', lastUsed: '2025-01-14', expiry: 'Never', status: 'active' },
  { id: 2, name: 'Staging Key', key: 'mf_test_••••••••••••••••9x1q', permissions: ['send', 'read'], created: '2024-10-15', lastUsed: '2025-01-13', expiry: '2025-06-30', status: 'active' },
  { id: 3, name: 'Analytics Read Only', key: 'mf_live_••••••••••••••••2z8w', permissions: ['read'], created: '2024-11-20', lastUsed: '2025-01-12', expiry: 'Never', status: 'active' },
  { id: 4, name: 'CI/CD Pipeline', key: 'mf_live_••••••••••••••••7m3n', permissions: ['send'], created: '2024-09-05', lastUsed: '2025-01-11', expiry: '2025-03-01', status: 'expiring' },
  { id: 5, name: 'Legacy Integration', key: 'mf_live_••••••••••••••••5s6t', permissions: ['send', 'read'], created: '2024-03-01', lastUsed: '2024-11-30', expiry: 'Never', status: 'revoked' },
];

export const webhooks = [
  { id: 1, event: 'email.delivered', url: 'https://api.acme.com/webhooks/email-delivered', secret: 'whsec_••••••••••4k2p', status: 'active', lastTrigger: '2025-01-14 12:01' },
  { id: 2, event: 'email.opened', url: 'https://api.acme.com/webhooks/email-opened', secret: 'whsec_••••••••••9x1q', status: 'active', lastTrigger: '2025-01-14 11:58' },
  { id: 3, event: 'email.clicked', url: 'https://hooks.zapier.com/hooks/catch/12345/abc', secret: 'whsec_••••••••••2z8w', status: 'active', lastTrigger: '2025-01-14 11:45' },
  { id: 4, event: 'email.bounced', url: 'https://api.crm.io/v1/bounce-handler', secret: 'whsec_••••••••••7m3n', status: 'inactive', lastTrigger: '2025-01-13 09:22' },
  { id: 5, event: 'email.failed', url: 'https://api.acme.com/webhooks/failed', secret: 'whsec_••••••••••5s6t', status: 'active', lastTrigger: '2025-01-14 11:30' },
  { id: 6, event: 'email.complaint', url: 'https://api.acme.com/webhooks/complaint', secret: 'whsec_••••••••••8r4v', status: 'active', lastTrigger: '2025-01-12 16:44' },
];

export const suppressionList = [
  { id: 1, email: 'bounce@invalid.com', reason: 'Hard Bounce', type: 'bounce', date: '2025-01-10', domain: 'mail.acme.com' },
  { id: 2, email: 'spam.report@example.com', reason: 'Spam Complaint', type: 'complaint', date: '2025-01-11', domain: 'noreply.techcorp.io' },
  { id: 3, email: 'noemail@nodomain.xyz', reason: 'Invalid Domain', type: 'bounce', date: '2025-01-09', domain: 'mail.acme.com' },
  { id: 4, email: 'fullmailbox@client.net', reason: 'Soft Bounce', type: 'bounce', date: '2025-01-12', domain: 'updates.enterprise.net' },
  { id: 5, email: 'markedspam@user.com', reason: 'Spam Complaint', type: 'complaint', date: '2025-01-08', domain: 'campaigns.bigbrand.com' },
];

export const attachments = [
  { id: 1, name: 'product-catalog.pdf', type: 'PDF', size: '2.4 MB', usedBy: 3, uploaded: '2025-01-10', url: '#' },
  { id: 2, name: 'logo-light.png', type: 'PNG', size: '48 KB', usedBy: 12, uploaded: '2024-12-15', url: '#' },
  { id: 3, name: 'invoice-template.xlsx', type: 'Excel', size: '156 KB', usedBy: 1, uploaded: '2025-01-08', url: '#' },
  { id: 4, name: 'banner-jan2025.jpg', type: 'JPEG', size: '890 KB', usedBy: 5, uploaded: '2025-01-05', url: '#' },
  { id: 5, name: 'terms-of-service.pdf', type: 'PDF', size: '1.1 MB', usedBy: 8, uploaded: '2024-11-20', url: '#' },
];

export const geoData = [
  { country: 'United States', opens: 42800, pct: 38.2 },
  { country: 'United Kingdom', opens: 18200, pct: 16.3 },
  { country: 'Germany', opens: 12400, pct: 11.1 },
  { country: 'France', opens: 9800, pct: 8.7 },
  { country: 'Canada', opens: 8600, pct: 7.7 },
  { country: 'Australia', opens: 7100, pct: 6.3 },
  { country: 'Others', opens: 12900, pct: 11.7 },
];
