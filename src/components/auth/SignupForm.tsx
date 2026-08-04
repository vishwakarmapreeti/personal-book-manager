'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

import {
    signupSchema,
    SignupFormData,
} from '@/lib/auth-validation';

import { signUp } from '@/services/auth.service';

export default function SignupForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    async function onSubmit(
        data: SignupFormData
    ) {
        try {
            setLoading(true);

            const response = await signUp({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });

            toast.success(response.message);

            router.push('/signin');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <Input
                label="Full Name"
                placeholder="John Doe"
                {...register('fullName')}
                error={errors.fullName?.message}
            />

            <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                error={errors.email?.message}
            />

            <Input
                label="Password"
                type="password"
                placeholder="********"
                {...register('password')}
                error={errors.password?.message}
            />

            <Input
                label="Confirm Password"
                type="password"
                placeholder="********"
                {...register('confirmPassword')}
                error={
                    errors.confirmPassword?.message
                }
            />

            <Button
                type="submit"
                loading={loading}
                className="w-full"
            >
                Create Account
            </Button>

            <p className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                    href="/signin"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}