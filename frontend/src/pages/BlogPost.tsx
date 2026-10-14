import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { apiClient as api } from '../api/client';
import { CodeWindow } from '../components/ui/CodeWindow';
import { LikeButton } from '../components/ui/LikeButton';
import { usePopSound } from '../hooks/usePopSound';

const fallbackArticles: Record<string, any> = {
  'bridging-esp32-with-nodejs-mqtt': {
    title: 'Bridging ESP32 Microcontrollers with Node.js via MQTT',
    excerpt: 'A comprehensive guide on establishing two-way telemetry streams between embedded edge microcontrollers and Node.js backend services.',
    categories: ['IoT', 'Node.js', 'ESP32'],
    publishedDate: '2025-01-15',
    readingTime: 6,
    content: `
### Introduction

Connecting the physical world to web dashboards requires a low-latency, resilient transport layer. In IoT engineering, **HTTP polling** introduces unacceptable overhead and battery drain for microcontrollers. 

Instead, the **MQTT (Message Queuing Telemetry Transport)** protocol enables publish-subscribe messaging over lightweight TCP sockets.

### System Architecture

1. **Edge Node:** ESP32 running C++ firmware with the \`PubSubClient\` library.
2. **Broker:** Mosquitto or HiveMQ broker handling topic pub/sub.
3. **Backend Service:** Node.js service using the \`mqtt\` npm package, persisting sensor events to MongoDB.
4. **Client Interface:** React frontend displaying live sensor graphs via WebSockets.

### ESP32 C++ Firmware Example

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  
  // Publish telemetry every 2 seconds
  float reading = analogRead(34) * (3.3 / 4095.0);
  client.publish("nodes/esp32/voltage", String(reading).c_str());
  delay(2000);
}
\`\`\`

### Node.js Subscriber Service

\`\`\`typescript
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('nodes/esp32/#');
});

client.on('message', (topic, payload) => {
  const value = parseFloat(payload.toString());
  console.log(\`[\${topic}]: \${value}\`);
  // Persist to MongoDB or stream to React UI
});
\`\`\`

### Key Takeaways
- Use **QoS 0** for high-frequency sensor streams where occasional packet loss is tolerable.
- Always implement auto-reconnect backoff to protect network stability.
`
  },
  'building-production-mern-stack-architecture': {
    title: 'Architecture Patterns for Production-Ready MERN Applications',
    excerpt: 'Key design patterns, middleware best practices, and MongoDB schema design techniques for scalable full-stack applications.',
    categories: ['Full-Stack', 'React', 'MongoDB'],
    publishedDate: '2024-11-20',
    readingTime: 8,
    content: `
### The Monolithic Pitfall
Many MERN stack tutorials encourage putting route logic directly inside controllers or inline router handlers. In production, this quickly leads to tangled dependencies and unmaintainable code.

### Separation of Concerns
A resilient architecture divides the application into distinct layers:

1. **Routes Layer:** Pure route definitions and middleware application.
2. **Controllers Layer:** Request validation, parameter parsing, and response status mapping.
3. **Services Layer:** Core business logic, third-party integrations, and transactions.
4. **Data Access / Models:** Mongoose schemas, indexes, and aggregation queries.

### Practical Tips
- Always index fields used in queries (\`db.users.createIndex({ email: 1 })\`).
- Validate request bodies with **Zod** before hitting controllers.
- Use structured JSON error responses with consistent status codes.
`
  },
  'why-typescript-is-essential-for-modern-web': {
    title: 'Why TypeScript is Essential for Robust Full-Stack Engineering',
    excerpt: 'Exploring type safety, developer productivity, and eliminating entire categories of runtime bugs in modern web codebases.',
    categories: ['TypeScript', 'JavaScript'],
    publishedDate: '2024-09-10',
    readingTime: 5,
    content: `
### Beyond Catching Typos
While TypeScript is famous for catching typos like \`undefined is not a function\`, its greatest power lies in **making refactoring fearless**.

When refactoring a backend API response, TypeScript immediately surfaces every single frontend component, hook, and test affected by the change.

### End-to-End Type Sharing
In full-stack projects, defining shared types (e.g. \`IUser\`, \`IProject\`) allows both backend and frontend to speak the exact same contract.

### Conclusion
Investing a few minutes in type annotations pays enormous dividends in speed, documentation, and system reliability.
`
  }
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const playPop = usePopSound();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        if (res.data) {
          setPost(res.data);
        } else if (slug && fallbackArticles[slug]) {
          setPost(fallbackArticles[slug]);
        }
      } catch (error) {
        if (slug && fallbackArticles[slug]) {
          setPost(fallbackArticles[slug]);
        } else {
          console.error('Failed to fetch blog post', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-text">Post not found</h2>
        <p className="text-sm text-text-muted">The article you are looking for may have been moved or updated.</p>
        <Link to="/blog" onClick={playPop} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft size={16} /> Return to all articles
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8"
    >
      <Link 
        to="/blog" 
        onClick={playPop}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <header className="space-y-4 pb-6 border-b border-border/80 dark:border-border-dark/80">
        <div className="flex flex-wrap items-center gap-2.5">
          {post.categories?.map((cat: string) => (
            <span key={cat} className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {cat}
            </span>
          ))}
          <span className="text-xs sm:text-sm text-text-muted flex items-center gap-1">
            <Calendar size={13} /> 
            {new Date(post.publishedDate || post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs sm:text-sm text-text-muted flex items-center gap-1">
            <Clock size={13} /> 
            {post.readingTime || 5} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-medium">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverImage && (
        <div className="w-full h-56 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-black/10">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-text prose-a:text-primary hover:prose-a:text-primary-dark prose-p:text-text-muted prose-p:leading-relaxed prose-li:text-text-muted">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({ _node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              
              if (!inline && match) {
                return (
                  <CodeWindow 
                    code={String(children).replace(/\n$/, '')} 
                    language={match[1]} 
                  />
                );
              }
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-primary font-mono text-xs sm:text-sm" {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="pt-8 border-t border-border/80 dark:border-border-dark/80 flex items-center justify-between">
        <LikeButton slug={post.slug || slug || 'article'} />
        
        <Link 
          to="/blog" 
          onClick={playPop}
          className="text-xs sm:text-sm font-semibold text-primary hover:underline"
        >
          Explore more articles →
        </Link>
      </div>

    </motion.article>
  );
};
