import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'Used for the main site title (e.g. "CeramicPro")',
        }),
        defineField({
            name: 'headerMenu',
            title: 'Header Menu',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'link', type: 'string', title: 'Link (URL or Path)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'footerDescription',
            title: 'Footer Description',
            type: 'text',
            rows: 3,
            description: 'Text shown in the footer about the site.',
        }),
        defineField({
            name: 'footerLinks',
            title: 'Footer Quick Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'link', type: 'string', title: 'Link (URL or Path)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'facebook', type: 'url', title: 'Facebook URL' },
                { name: 'twitter', type: 'url', title: 'Twitter URL' },
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'youtube', type: 'url', title: 'YouTube URL' },
            ]
        })
    ],
})
