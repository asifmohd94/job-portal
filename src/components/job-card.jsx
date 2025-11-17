import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useFetch } from './hooks/use-fetch';
import { saveJob } from '@/api/jobApi';

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onSavedJob = () => { }
}) => {

    const { fn: fnSavedJob, data: savedJob, loading: loadingSavedJob } = useFetch(saveJob);

    const { user } = useUser();

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });
        onSavedJob();
    }

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

                <Heart stroke='red' size={20} fill='red' />
            </CardFooter>
        </Card>
    )
}

export default JobCard;