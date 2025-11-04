import { Languages } from 'lucide-react';
import useUI from '../../store/useUI';

const LanguageToggle = () => {
    const { language, setLanguage } = useUI();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${language === 'en'
                        ? 'bg-brain-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${language === 'tr'
                        ? 'bg-brain-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                    }`}
            >
                TR
            </button>
            <Languages className="w-5 h-5 text-gray-400 ml-2" />
        </div>
    );
};

export default LanguageToggle;