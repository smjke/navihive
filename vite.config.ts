import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
})
export default defineConfig(( ) => ({
// Other config lines
	build: {
		rollupOptions: {
			output: {
				// Put every top–level node_module into its own chunk.
				// Example:  node_modules/@polar-sh/sdk → chunk “@polar-sh”
				manualChunks(id) {
					if (id.includes("node_modules")) {
						const name = id
							.split("/node_modules/")[1] // strip leading path
							.replace(/^@?([^/]+).*$/, "$1"); // top-level package name
						return name;
					}
				},
			},
		},
	},
}));
