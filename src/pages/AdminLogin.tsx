import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../store/useAuth";
import { AlertCircle, Brain, Lock } from "lucide-react";

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            const success = login(password);

            if (success) {
                navigate('/admin');
            } else {
                setError('Invalid password. Please try again.');
                setPassword('');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="inline-block"
                    >
                        <Brain className='w-16 h-16 text-brain-400 mx-auto mb-4' />
                    </motion.div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Admin Panel</h1>
                    <p className="text-gray-400">Enter your password to continue</p>
                </div>

                {/* Login Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Pasword
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError('')
                                }}
                                disabled={isLoading}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-brain-500 focus:ring-brain-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                autoFocus
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 flex items-center gap-2 text-red-400 text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="w-full py-3 bg-gradient-to-r from brain-400 to-purple-400 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brain-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <Lock className="w-4 h-4" />
                                Login to Admin Panel
                            </>
                        )}
                    </button>

                    {/* Info */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <p className="text-xs text-gray-500 text-center">
                            🔒 This is a protected area. Only administrators can access.
                        </p>
                    </div>
                </motion.form>

                {/* Back to Home */}
                <motion.button
                    onClick={() => navigate('/')}
                    className="mt-6 w-full py-2 text-gray-600 hover:text-white transition-colors text-sm"
                >
                    ← Back to Portfolio
                </motion.button>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
