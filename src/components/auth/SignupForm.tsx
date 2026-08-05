'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';

import { FiEye, FiEyeOff } from 'react-icons/fi';

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

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

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

            {/* Password */}

            <div>


                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        {...register('password')}
                        error={errors.password?.message}
                        suffix={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="text-slate-500 hover:text-slate-700"
                            >
                                {showPassword ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        }
                    />
                </div>
            </div>

            {/* Confirm Password */}

            <div>

                <div className="relative">
                    <Input
                        label="Confirm Password"
                        type={
                            showConfirmPassword
                                ? 'text'
                                : 'password'
                        }
                        placeholder="********"
                        {...register('confirmPassword')}
                        error={
                            errors.confirmPassword?.message
                        }
                        suffix={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="text-slate-500 hover:text-slate-700"
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        }
                    />
                </div>
            </div>

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