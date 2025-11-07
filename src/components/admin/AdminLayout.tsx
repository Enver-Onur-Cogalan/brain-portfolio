import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogOut, Save } from "lucide-react";
import { useAuth } from "../../store/useAuth";
import AboutEditor from "./AboutEditor";
import SkillsEditor from "./SkillsEditor";
import ProjectEditor from "./ProjectsEditor";
import PreviewPane from "./PreviewPane";
import { useContent } from "../../store/useContent";


type Tab = 'about' | 'skills' | 'projects';

const AdminLayout = () => {
    const { logout } = useAuth();
    const { saveToServer } = useContent();
    const [activeTab, setActiveTab] = useState<Tab>('about');
    const [showPreview, setShowPreview] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);

    const tabs = [
        { id: 'about' as Tab, label: 'About Section' },
        { id: 'skills' as Tab, label: 'Skills Section' },
        { id: 'projects' as Tab, label: 'Projects Section' }
    ];

    const handleSave = () => {
        const key = import.meta.env.VITE_ADMIN_PASSWORD as string;
        saveToServer(key).then((ok) => {
            setHasChanges(false);
            alert(ok ? 'Published successfully!' : 'Publish failed');
        })
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
                        {hasChanges && (
                            <span className="text-sm text-yellow-400 flex items-center gap-2">
                                • Unsaved changes
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save All
                        </button>

                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-6 flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradinet-to-r from-brain-400 to-purple-400"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 h-[calc(100vh-130px)] overflow-hidden">
                {/* Editör Panel */}
                <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-y-auto p-6 bg-gray-950`}>
                    {activeTab === 'about' && <AboutEditor onChange={() => setHasChanges(true)} />}
                    {activeTab === 'skills' && <SkillsEditor onChange={() => setHasChanges(true)} />}
                    {activeTab === 'projects' && <ProjectEditor onChange={() => setHasChanges(true)} />}
                </div>

                {/* Preview Panel */}
                {showPreview && (
                    <div className="w-1/2 border-l border-gray-800 bg-gray-900 overflow-hidden">
                        <PreviewPane activeSection={activeTab} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLayout;