
import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

interface FormState {
    name: string;
    phone: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });
    const [formState, setFormState] = useState<FormState>({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, you would handle form submission here.
        console.log('Form submitted:', formState);
        alert('感谢您的留言，我们会尽快与您联系！');
        setFormState({ name: '', phone: '', email: '', message: '' });
    };

    return (
        <section id="contact" ref={ref} className={`py-16 md:py-24 bg-background-light dark:bg-background-dark text-text-light transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`container mx-auto px-4 ${isVisible ? 'section-visible' : ''}`}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light">联系我们</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">我们期待与您沟通，共同打造您的理想空间。</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 bg-background-light dark:bg-secondary/10 p-8 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-accent text-2xl font-bold mb-4">联系信息</h3>
                            <div className="space-y-4">
                                <InfoItem icon="call" label="电话" value="+86 123 4567 8900" href="tel:+8612345678900" />
                                <InfoItem icon="mail" label="邮箱" value="hello@decor.com" href="mailto:hello@decor.com" />
                                <InfoItem icon="location_on" label="地址" value="上海市徐汇区创意园A座101室" />
                            </div>
                        </div>
                        <div>
                             <h3 className="text-accent text-2xl font-bold mb-4">公司位置</h3>
                             <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                                <img className="h-full w-full object-cover" alt="Map showing company location in Shanghai" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-accent text-2xl font-bold mb-4">在线咨询</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormInput id="name" name="name" label="您的姓名" placeholder="请输入您的姓名" value={formState.name} onChange={handleInputChange} />
                            <FormInput id="phone" name="phone" type="tel" label="您的电话" placeholder="请输入您的电话号码" value={formState.phone} onChange={handleInputChange} />
                            <FormInput id="email" name="email" type="email" label="您的邮箱" placeholder="请输入您的邮箱地址" value={formState.email} onChange={handleInputChange} />
                            <div>
                                <label className="block text-sm font-medium text-gray-300" htmlFor="message">您的留言</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" value={formState.message} onChange={handleInputChange} placeholder="请在此处输入您的咨询信息..." rows={4} className="block w-full rounded-md border-gray-600 bg-background-dark text-accent shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                                立即提交
                            </button>
                        </form>
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

interface FormInputProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, name, label, placeholder, value, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300" htmlFor={id}>{label}</label>
        <div className="mt-1">
            <input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="block w-full rounded-md border-gray-600 bg-background-dark text-accent shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
        </div>
    </div>
);

export default Contact;
