let ENV = process.env.NODE_ENV || 'dev';
let PORT = ENV==="prod"? 80 : 3001;

export const config = {
	env: ENV,
	port: PORT,
	corsHeaders: ["Link"]
}

export const env = process.env.NODE_ENV || 'dev';
export const port = ENV==="prod"? 80 : 3000;
export const corsHeaders = ["Link"];