import { useState } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Users, 
  CheckCircle, 
  PlayCircle,
  Star,
  Trophy,
  BookOpen,
  Target,
  Zap,
  Heart,
  Shield,
  Settings
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'brands' | 'products' | 'skinTypes' | 'problems' | 'machines';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string;
  price: number;
  progress: number;
  completed: boolean;
  certification: string;
  instructor: string;
  rating: number;
  students: number;
  practicalRequired: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Dermapen Advanced Techniques',
    description: 'Master advanced microneedling techniques with Dermapen 4. Learn depth settings, treatment protocols, and safety measures.',
    category: 'machines',
    level: 'advanced',
    duration: '4h 30min',
    price: 2500,
    progress: 85,
    completed: false,
    certification: 'Dermapen Certified Practitioner',
    instructor: 'Dr. Maria Andersson',
    rating: 4.8,
    students: 342,
    practicalRequired: true
  },
  {
    id: '2',
    title: 'SkinCeuticals Product Knowledge',
    description: 'Complete guide to SkinCeuticals skincare range, ingredients, and treatment protocols.',
    category: 'brands',
    level: 'beginner',
    duration: '2h 15min',
    price: 1200,
    progress: 100,
    completed: true,
    certification: 'SkinCeuticals Specialist',
    instructor: 'Anna Bergström',
    rating: 4.9,
    students: 567,
    practicalRequired: false
  },
  {
    id: '3',
    title: 'Acne Treatment Fundamentals',
    description: 'Understanding acne pathology, treatment options, and patient management strategies.',
    category: 'problems',
    level: 'intermediate',
    duration: '3h 45min',
    price: 1800,
    progress: 45,
    completed: false,
    certification: 'Acne Specialist',
    instructor: 'Dr. Erik Nilsson',
    rating: 4.7,
    students: 289,
    practicalRequired: true
  },
  {
    id: '4',
    title: 'Fitzpatrick Skin Types & Assessment',
    description: 'Master skin type assessment, phototype classification, and treatment customization.',
    category: 'skinTypes',
    level: 'beginner',
    duration: '1h 30min',
    price: 800,
    progress: 0,
    completed: false,
    certification: 'Skin Assessment Specialist',
    instructor: 'Lisa Johansson',
    rating: 4.6,
    students: 445,
    practicalRequired: false
  },
  {
    id: '5',
    title: 'Hydrafacial MD System Mastery',
    description: 'Complete training on Hydrafacial MD system, serums, and treatment protocols.',
    category: 'machines',
    level: 'intermediate',
    duration: '5h 00min',
    price: 3200,
    progress: 0,
    completed: false,
    certification: 'Hydrafacial Certified Provider',
    instructor: 'Dr. Sofia Lindberg',
    rating: 4.9,
    students: 123,
    practicalRequired: true
  },
  {
    id: '6',
    title: 'Environ Skincare System',
    description: 'Understanding vitamin A skincare, step-up systems, and client consultation.',
    category: 'products',
    level: 'intermediate',
    duration: '2h 45min',
    price: 1500,
    progress: 0,
    completed: false,
    certification: 'Environ Skincare Specialist',
    instructor: 'Helena Svensson',
    rating: 4.8,
    students: 234,
    practicalRequired: false
  }
];

const categoryIcons = {
  brands: Star,
  products: Heart,
  skinTypes: Target,
  problems: Shield,
  machines: Settings
};

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800'
};

export default function Education() {
  const { currentRole } = useUserRole();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  if (currentRole.id !== 'anstalld') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Åtkomst nekad</h1>
        <p className="text-gray-500">Endast anställda har tillgång till utbildningsportalen.</p>
      </div>
    );
  }

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const completedCourses = mockCourses.filter(c => c.completed).length;
  const totalProgress = Math.round(mockCourses.reduce((sum, course) => sum + course.progress, 0) / mockCourses.length);
  const certifications = mockCourses.filter(c => c.completed).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          Utbildningsportal
        </h1>
        <p className="text-gray-600 mt-2">
          Utveckla dina färdigheter, få nya certifieringar och öka dina möjligheter
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{completedCourses}</p>
                <p className="text-sm text-gray-600">Slutförda kurser</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{certifications}</p>
                <p className="text-sm text-gray-600">Certifieringar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalProgress}%</p>
                <p className="text-sm text-gray-600">Genomsnittlig framsteg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">Pro</p>
                <p className="text-sm text-gray-600">Nuvarande nivå</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Tillgängliga kurser</TabsTrigger>
          <TabsTrigger value="progress">Min framsteg</TabsTrigger>
          <TabsTrigger value="certifications">Certifieringar</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Alla kategorier</option>
                <option value="brands">Varumärken</option>
                <option value="products">Produkter</option>
                <option value="skinTypes">Hudtyper</option>
                <option value="problems">Hudproblem</option>
                <option value="machines">Maskiner</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nivå</label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Alla nivåer</option>
                <option value="beginner">Nybörjare</option>
                <option value="intermediate">Medel</option>
                <option value="advanced">Avancerad</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const IconComponent = categoryIcons[course.category];
              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <Badge className={levelColors[course.level]}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </Badge>
                      </div>
                      {course.completed && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Framsteg</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">{course.price} kr</p>
                        {course.practicalRequired && (
                          <p className="text-xs text-amber-600">+ Praktiskt prov krävs</p>
                        )}
                      </div>
                      <Button 
                        variant={course.completed ? "outline" : "default"}
                        size="sm"
                      >
                        {course.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Slutförd
                          </>
                        ) : course.progress > 0 ? (
                          <>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Fortsätt
                          </>
                        ) : (
                          "Starta kurs"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Din utbildningsframsteg</CardTitle>
              <CardDescription>
                Översikt över dina pågående kurser och framsteg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCourses.filter(c => c.progress > 0 && !c.completed).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                    <div className="mt-2">
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{course.progress}%</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Fortsätt
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.filter(c => c.completed).map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <div>
                      <CardTitle className="text-lg">{course.certification}</CardTitle>
                      <CardDescription>Slutförd kurs: {course.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instruktör:</span>
                      <span className="text-sm font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Betyg:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Ladda ned certifikat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}