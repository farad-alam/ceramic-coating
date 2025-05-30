import { Shield } from 'lucide-react';

export default function Logo({ className }) {
  return (
    <div className={`relative ${className}`}>
      <Shield className="text-primary" />
      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-background">CC</div>
    </div>
  );
}