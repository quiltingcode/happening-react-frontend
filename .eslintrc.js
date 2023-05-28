module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": ["react"],
	"rules": {
		"react/no-unescaped-entities": ["error", { "forbid": [">", "}"] }],
		"react/prop-types": [0, { "ignore": ["children"] }],
		"react/no-children-prop": [
			0,
			{
				"allowFunctions": true
			}
		]
	}
}
