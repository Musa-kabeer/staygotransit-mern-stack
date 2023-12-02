import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { SERVER_DOMAIN } from '../../helpers/utils';
import { toast } from 'react-hot-toast';
import { useNavigate, useHistory } from 'react-router-dom';

interface IOTPData {
     otp: string;
}

interface UseContinueWithEmailResult {
     status: string;
     verifyOTP: UseMutateFunction<void, Error, IOTPData, unknown>;
}

export const useOTPVerification = (): UseContinueWithEmailResult => {
     const navigate = useNavigate();

     const { status, mutate: verifyOTP } = useMutation({
          mutationFn: async (otp: IOTPData) => {
               try {
                    const response = await fetch(
                         `${SERVER_DOMAIN}/api/v1/auth/otp-verification`,
                         {
                              method: 'POST',

                              headers: {
                                   'Content-Type': 'application/json',
                              },

                              credentials: 'include',

                              body: JSON.stringify(otp),
                         }
                    );

                    const data = await response.json();

                    if (data.status === 'fail') {
                         throw new Error(data.message);
                    }

                    // user as no account before
                    if (data.status === 'success') {
                         JSON.stringify(
                              localStorage.setItem('staygotransitemail', '')
                         );

                         navigate('/stays', { replace: true });

                         window.location.reload();
                    }
               } catch (err: any) {
                    console.log(err);
                    toast.error(err.message);
               }
          },
     });

     return { status, verifyOTP };
};
