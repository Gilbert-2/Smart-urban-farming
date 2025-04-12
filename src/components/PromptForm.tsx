import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  User, 
  MapPin, 
  Sprout, 
  LayoutGrid, 
  Award, 
  Settings, 
  ArrowRight,
  Leaf
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  cropType: z.string().optional(),
  farmLayout: z.string().optional(),
  experienceLevel: z.string().optional(),
  goal: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const cropOptions = [
  { value: "leafyGreens", label: "Leafy Greens (Lettuce, Spinach)" },
  { value: "herbs", label: "Herbs (Basil, Mint, Cilantro)" },
  { value: "tomatoes", label: "Tomatoes" },
  { value: "peppers", label: "Peppers" },
  { value: "strawberries", label: "Strawberries" },
  { value: "mixedVegetables", label: "Mixed Vegetables" },
];

const layoutOptions = [
  { value: "vertical", label: "Vertical Farm" },
  { value: "horizontal", label: "Horizontal Beds" },
  { value: "containerized", label: "Containerized System" },
  { value: "aquaponic", label: "Aquaponic System" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const goalOptions = [
  { value: "maximumYield", label: "Maximum Yield" },
  { value: "minimumWater", label: "Minimum Water Usage" },
  { value: "energyEfficiency", label: "Energy Efficiency" },
  { value: "qualityProduce", label: "Quality Produce" },
  { value: "educationalDemo", label: "Educational/Demonstration" },
];

const PromptForm = () => {
  const [step, setStep] = React.useState<number>(1);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = React.useState<number>(0);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      cropType: "",
      farmLayout: "",
      experienceLevel: "",
      goal: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setShowLoading(true);

    localStorage.setItem("farmingSimulationUser", JSON.stringify(data));
    
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const nextStep = () => {
    const currentStepFields = {
      1: ["name"],
      2: ["location", "cropType"],
      3: ["farmLayout", "experienceLevel"],
      4: ["goal"]
    };
    
    const fieldsToValidate = currentStepFields[step as keyof typeof currentStepFields];
    
    if (step === 1) {
      form.trigger("name").then((valid) => {
        if (valid) setStep(prev => prev + 1);
      });
    } else if (step === 2) {
      form.trigger("location").then((valid) => {
        if (valid) setStep(prev => prev + 1);
      });
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  if (showLoading) {
    return (
      <Dialog open={showLoading} onOpenChange={setShowLoading}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Building Your Smart Farm</DialogTitle>
            <DialogDescription className="text-center">
              Preparing your personalized urban farming experience...
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300 ease-in-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <span>Configuring sensors</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border-green-100">
        <CardHeader className="bg-gradient-to-r from-green-100 to-cyan-100 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-gray-800">
            <span className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              Smart Urban Farming Simulation
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Configure your personalized urban farm to start the simulation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={String(step)} className="w-full">
                <TabsContent value="1" className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-700 mb-4">
                    <User size={20} />
                    <h3 className="text-lg font-medium">About You</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll use this to personalize your experience.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="2" className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-700 mb-4">
                    <MapPin size={20} />
                    <h3 className="text-lg font-medium">Location & Crop Selection</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormDescription>
                          This helps adjust environmental factors.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Selection (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crops to grow" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cropOptions.map((crop) => (
                              <SelectItem key={crop.value} value={crop.value}>
                                <div className="flex items-center gap-2">
                                  <Sprout className="h-4 w-4 text-green-600" />
                                  {crop.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose what you'd like to grow in your simulation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="3" className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-700 mb-4">
                    <LayoutGrid size={20} />
                    <h3 className="text-lg font-medium">Farm Setup</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="farmLayout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Layout (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a layout" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {layoutOptions.map((layout) => (
                              <SelectItem key={layout.value} value={layout.value}>
                                {layout.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Different layouts have different space requirements and yields.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceOptions.map((exp) => (
                              <SelectItem key={exp.value} value={exp.value}>
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4 text-amber-600" />
                                  {exp.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This will adjust the complexity of the simulation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="4" className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-700 mb-4">
                    <Settings size={20} />
                    <h3 className="text-lg font-medium">Goals & Objectives</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Goal (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="What would you like to achieve?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {goalOptions.map((goal) => (
                              <SelectItem key={goal.value} value={goal.value}>
                                {goal.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The simulation will prioritize this goal in its recommendations.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Start Simulation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              
                {step !== 4 && (
                  <div className="flex justify-end space-x-2 pt-4">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                    )}
                    <Button 
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              
                <div className="flex justify-center space-x-2 pt-4">
                  <TabsList>
                    {[1, 2, 3, 4].map((s) => (
                      <TabsTrigger 
                        key={s}
                        value={String(s)} 
                        onClick={() => step >= s && setStep(s)}
                        disabled={step < s}
                        className={`w-3 h-3 rounded-full ${step === s ? 'bg-green-600' : 
                          step > s ? 'bg-gray-400' : 'bg-gray-200'}`}
                      />
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptForm;
