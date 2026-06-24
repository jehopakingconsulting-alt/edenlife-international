-- EDENLIFE International — Database Schema
-- Run this in Supabase SQL Editor

-- User profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  city TEXT,
  country TEXT,
  avatar_url TEXT,
  bio TEXT,
  user_type TEXT NOT NULL DEFAULT 'member' CHECK (user_type IN ('ambassador', 'pastor', 'member', 'collaborator', 'partner')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  points INTEGER NOT NULL DEFAULT 0,
  badge TEXT NOT NULL DEFAULT 'bronze' CHECK (badge IN ('bronze', 'silver', 'gold', 'elite')),
  qr_code TEXT,
  digital_id TEXT,
  locale TEXT DEFAULT 'fr',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Donations
CREATE TABLE public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'CAD',
  frequency TEXT NOT NULL DEFAULT 'once' CHECK (frequency IN ('once', 'monthly')),
  fund TEXT NOT NULL DEFAULT 'general',
  payment_method TEXT NOT NULL DEFAULT 'stripe',
  payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  receipt_requested BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  event_type TEXT NOT NULL DEFAULT 'in_person' CHECK (event_type IN ('online', 'in_person')),
  category TEXT NOT NULL DEFAULT 'conference',
  price DECIMAL(10,2),
  max_spots INTEGER,
  spots_taken INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Event registrations
CREATE TABLE public.event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Blog posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL DEFAULT 'news' CHECK (category IN ('news', 'testimonials', 'stories')),
  likes INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Comments
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location TEXT,
  beneficiaries INTEGER DEFAULT 0,
  duration TEXT,
  goal DECIMAL(10,2),
  raised DECIMAL(10,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Courses (E-Learning)
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  instructor_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL DEFAULT 'business',
  level TEXT NOT NULL DEFAULT 'beginner',
  lessons INTEGER DEFAULT 0,
  hours DECIMAL(4,1) DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Course enrollments
CREATE TABLE public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- Certificates
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  cert_type TEXT NOT NULL DEFAULT 'training' CHECK (cert_type IN ('training', 'ambassador', 'participation', 'achievement')),
  cert_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Polls / Votes
CREATE TABLE public.polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  ends_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  option_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- Gallery
CREATE TABLE public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'events',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for most tables
CREATE POLICY "Public read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.courses FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.polls FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

-- User can read/update their own profile
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Users can read their own data
CREATE POLICY "Users read own donations" ON public.donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert donations" ON public.donations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users register events" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users enroll courses" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users vote" ON public.poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own votes" ON public.poll_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can submit comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public read comments" ON public.comments FOR SELECT USING (true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can contact" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
