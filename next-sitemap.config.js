/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://shrimpstore.vercel.app',
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
            'https://shrimpstore.vercel.app/sitemap.xml'
        ]
    },
    changefreq: 'daily',
    priority: 0.7,
}
