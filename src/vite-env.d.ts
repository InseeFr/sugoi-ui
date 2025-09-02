/// <reference types="vite/client" />

interface ViteTypeOptions {}

interface ImportMetaEnv {
	readonly VITE_UI_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
