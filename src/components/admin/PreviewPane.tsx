import { useEffect, useRef } from "react"

import useUI from "../../store/useUI"
import About from "../About"
import Skills from "../Skills"
import Projects from "../Projects"
import { Languages } from "lucide-react"

interface Props {
    activeSection: 'about' | 'skills' | 'projects';
}

const PreviewPane = ({ activeSection }: Props) => {
    const { language, setLanguage } = useUI();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Preview scroll to top on seciton change
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSection]);

    return (
        <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-300">Live Preview</span>
                </div>
                <button
                    onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded flex items-center gap-2 text-sm transition-colors"
                >
                    <Languages className="w-4 h-4" />
                    {language.toUpperCase()}
                </button>
            </div>

            {/* Preview Content */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto bg-gray-950"
                style={{ zoom: 0.75 }}
            >
                <div className="min-h-screen">
                    {activeSection === 'about' && (
                        <div className="relative z-10 w-full flex justify-end">
                            <div className="w-full text-foreground">
                                <About />
                            </div>
                        </div>
                    )}

                    {activeSection === 'skills' && (
                        <div className="relative z-10 w-full flex justify-end">
                            <div className="w-full text-foreground">
                                <Skills />
                            </div>
                        </div>
                    )}

                    {activeSection === 'projects' && (
                        <div className="relative z-10 w-full">
                            <Projects />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPane;