/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/admin',
            },
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'http://localhost:3000/server-sitemap.xml'
        ]
    },
    changefreq: 'daily',
    priority: 0.7,
}
