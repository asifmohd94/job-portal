import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useFetch } from './hooks/use-fetch';
import { saveJob } from '@/api/jobApi';
import { useUser } from '@clerk/clerk-react';

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onSavedJob = () => { }
}) => {
    const [isSaved, setIsSaved] = useState(savedInit);
    const { fn: fnSavedJob, data: savedJob, loading: loadingSavedJob } = useFetch(saveJob, {
        alreadySaved: isSaved,
    });

    const { user } = useUser();

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });
        onSavedJob();
    }

    useEffect(() => {
        if (savedJob !== undefined) {
          setIsSaved(savedJob?.length > 0);
        }
      }, [savedJob]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className='flex items-center justify-between'>
                    <div>
                        {job.company && <img src={job.company.logo_url} key={job.id} className='h-6' />}
                    </div>

                    <div className='flex items-center gap-4'>
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr />

                <div>
                    {job.description?.substring(0, job.description.indexOf('.'))}
                </div>
            </CardContent>
            <CardFooter className='flex gap-2'>
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button variant='secondary' className='w-full'>More Details</Button>
                </Link>

                {
                    !isMyJob && (
                        <Button
                            variant="outline"
                            className="w-15"
                            onClick={() => handleSaveJob()}
                            disabled={loadingSavedJob}
                        >
                            {
                                isSaved ? 
                                <Heart stroke='red' size={20} fill='red' /> : <Heart />
                            }
                        </Button>
                    )
                }

                
            </CardFooter>
        </Card>
    )
}

export default JobCard;