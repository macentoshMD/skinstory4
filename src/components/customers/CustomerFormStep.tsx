
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'Female' | 'Male' | '';
  language: string;
  howFoundUs: string;
}

interface CustomerFormStepProps {
  formData: CustomerFormData;
  onFormDataChange: (field: keyof CustomerFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function CustomerFormStep({ 
  formData, 
  onFormDataChange, 
  onBack, 
  onSubmit 
}: CustomerFormStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Customer</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">Customer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => onFormDataChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Second name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => onFormDataChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <Card className="border-2 border-blue-400">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-700 border-b border-dashed border-gray-400 pb-2">
                Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => onFormDataChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onFormDataChange('email', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">Birthday</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Select value={formData.birthDay} onValueChange={(value) => onFormDataChange('birthDay', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={formData.birthMonth} onValueChange={(value) => onFormDataChange('birthMonth', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 
                    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'].map((month, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={formData.birthYear} onValueChange={(value) => onFormDataChange('birthYear', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 80 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">Gender</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => onFormDataChange('gender', value)}
            className="grid grid-cols-2 gap-8"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-700">Additional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Select value={formData.language} onValueChange={(value) => onFormDataChange('language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="svenska">Svenska</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={formData.howFoundUs} onValueChange={(value) => onFormDataChange('howFoundUs', value)}>
              <SelectTrigger>
                <SelectValue placeholder="How found us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="friend">Vän/Bekant</SelectItem>
                <SelectItem value="website">Hemsida</SelectItem>
                <SelectItem value="other">Annat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Tillbaka
        </Button>
        <Button onClick={onSubmit} className="flex-1">
          Nästa: Välj problem
        </Button>
      </div>
    </div>
  );
}
