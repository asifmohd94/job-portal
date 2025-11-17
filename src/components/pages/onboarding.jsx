import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";



const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user.update({
      unsafeMetadata: { role }
    })
      .then(() => {
        navigate(role === 'recruiter' ? '/post-job' : '/jobs');
      })
      .catch((error) => {
        console.error(error);
      })
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      navigate(user.unsafeMetadata.role === 'recruiter' ? '/post-job' : '/jobs');
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center mt-40 mb-40">
      <h2 className="gradient-title text-7xl sm:text-8xl tracking-tighter font-extrabold">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md-px-40">
        <Button variant="blue" className="text-2xl h-36" onClick={() => handleRoleSelection('candidate')}>
          Candidate
        </Button>
        <Button variant="destructive" className="text-2xl h-36" onClick={() => handleRoleSelection('recruiter')}>
          Recruiter
        </Button>
      </div>
    </div>
  )
}

export default OnBoarding