import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    }

    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignIn(true);
        }
    }, [search]);



    return (
        <>
            <nav className='pb-4 flex justify-between items-center'>
                <img src='./logo.png' className='h-20' />

                <div className='flex gap-8'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)} >Login</Button>
                    </SignedOut>
                    <SignedIn>
                        {
                            user?.unsafeMetadata?.role === 'recruiter' && (
                                <Link to="/post-job">
                                    {/* condition */}
                                    <Button variant="destructive" className="rounded-full">
                                        <PenBox size={20} className='mr-2' />
                                        Post a Job
                                    </Button>
                                </Link>
                            )
                        }

                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-10 h-10 rounded-full',
                                }
                            }}
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    labelIcon={<BriefcaseBusinessIcon size={15} />}
                                    href='/my-jobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<Heart size={15} />}
                                    href='/saved-jobs'
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>

            </nav>

            {
                showSignIn && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
                        onClick={handleOverlayClick}
                    >
                        <SignIn
                            signUpForceRedirectUrl='/onboarding'
                            signUpFallbackRedirectUrl='/onboarding'
                        />
                    </div>

                )
            }
        </>
    )
}

export default Header