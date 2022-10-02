import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:7070/graphql',
	documents: '**/*.{gql,graphql}',
	generates: {
		'./app/schemes/schema-ts': {
			preset: 'client',
			plugins: [],
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
}

export default config
