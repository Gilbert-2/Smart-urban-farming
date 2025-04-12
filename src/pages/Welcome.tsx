
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptForm from '@/components/PromptForm';

const Welcome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has already completed the form
    const userData = localStorage.getItem("farmingSimulationUser");
    
    if (userData) {
      // User has already completed the form, redirect to dashboard
      // We can add a parameter to force showing the form again if needed
      const urlParams = new URLSearchParams(window.location.search);
      const resetForm = urlParams.get('reset');
      
      if (!resetForm) {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  return <PromptForm />;
};

export default Welcome;
