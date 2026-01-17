import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineConfig({
    basePath: '/studio',
    title: 'Ceramic Pro Blog',
    projectId,
    dataset,
    // Add and edit the content schema in the './schemas' folder
    schema: {
        types: schemaTypes,
    },
    plugins: [
        deskTool(),
    ],
})
