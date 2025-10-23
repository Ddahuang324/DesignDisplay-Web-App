
import React from 'react';
import { useInView } from '../hooks/useInView';

const Contact: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });

    return (
        <section id="contact" ref={ref} className={`py-16 md:py-24 bg-background-light dark:bg-transparent animated-bg-dark ${isVisible ? 'aurora-visible' : ''}`}>
            <div className={`container mx-auto px-4 ${isVisible ? 'section-visible' : ''}`}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light">联系我们</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">我们期待与您沟通，共同打造您的理想空间。</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 bg-background-light dark:bg-background-dark/50 dark:backdrop-blur-sm p-8 rounded-xl shadow-lg">
                    {/* Column 1: Contact Info */}
                    <div>
                        <h3 className="text-accent text-2xl font-bold mb-6">联系信息</h3>
                        <div className="space-y-6">
                            <InfoItem icon="call" label="电话" value="+86 123 4567 8900" href="tel:+8612345678900" />
                            <InfoItem icon="mail" label="邮箱" value="hello@decor.com" href="mailto:hello@decor.com" />
                            <InfoItem icon="location_on" label="地址" value="上海市徐汇区创意园A座101室" />
                        </div>
                    </div>
                    {/* Column 2: Location Map */}
                    <div>
                         <h3 className="text-accent text-2xl font-bold mb-6">公司位置</h3>
                         <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                            <img className="h-full w-full object-cover" alt="Map showing company location in Shanghai" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface InfoItemProps {
    icon: string;
    label: string;
    value: string;
    href?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, href }) => (
    <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            {href ? (
                 <a className="text-accent text-sm hover:text-primary transition-colors" href={href}>{value}</a>
            ) : (
                <p className="text-accent text-sm">{value}</p>
            )}
        </div>
    </div>
);

export default Contact;