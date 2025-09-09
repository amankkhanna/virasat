"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Users, Star, Calendar, ArrowRight, Timer } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Festival Inauguration",
    description: "Join us for the grand opening ceremony of Virasat Festival 2024, marking the beginning of our cultural celebration.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹2000",
    featured: true,
    category: "Inauguration"
  },
  {
    id: 2,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Choliya – Folk Form of Uttarakhand",
    description: "Experience the traditional folk dance of Uttarakhand, showcasing the rich cultural heritage of the Himalayan region.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:30 PM",
    location: "Heritage Hall",
    seats: "300 seats available",
    price: "₹1500",
    featured: false,
    category: "Folk Dance"
  },
  {
    id: 3,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Sarod recital by Ustad Amjad Ali Khan",
    description: "An enchanting evening with the legendary sarod maestro, presenting classical ragas and timeless melodies.",
    image: "/images/artists/ring.png",
    time: "8:00 PM",
    location: "Classical Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Music"
  },
  {
    id: 4,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Vintage Car Rally",
    description: "Witness a spectacular display of vintage automobiles showcasing automotive heritage and craftsmanship.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "10:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Heritage"
  },
  {
    id: 5,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Bharatnatyam dance by Aarohi Munshi",
    description: "A mesmerizing performance of classical Bharatnatyam by the talented Aarohi Munshi, bringing ancient stories to life.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "6:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 6,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Sitar recital by Adnan Khan",
    description: "An evening of soulful sitar melodies by the renowned Adnan Khan, exploring the depths of Hindustani classical music.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 7,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Osman Mir Live",
    description: "A contemporary musical experience with Osman Mir, blending traditional and modern sounds in a unique performance.",
    image: "/images/artists/birju_maharaj.png",
    time: "8:00 PM",
    location: "Open Air Theater",
    seats: "400 seats available",
    price: "₹1200",
    featured: false,
    category: "Contemporary Music"
  },
  {
    id: 8,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 9,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Folk performances from Uttarakhand",
    description: "A vibrant showcase of traditional folk music and dance forms from the beautiful state of Uttarakhand.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 10,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Sarod recital by Pratik Shrivastava",
    description: "An intimate performance by the talented sarod artist Pratik Shrivastava, presenting classical compositions.",
    image: "/images/artists/ring.png",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1500",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 11,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Hindustani vocal by Pt Ulhas Kashalkar",
    description: "An evening of classical vocal music by the renowned Pandit Ulhas Kashalkar, master of the Gwalior gharana.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2200",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 12,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 13,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Sitar recital by Soumitra Thakur",
    description: "An evening of classical sitar music by the talented Soumitra Thakur, exploring traditional ragas and compositions.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 14,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Vocal recital by Aniruddh Aithal",
    description: "A soulful vocal performance by Aniruddh Aithal, presenting classical Hindustani vocal music with traditional compositions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "8:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 15,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 16,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Slide Guitar concert by Deepak Kshirsagar",
    description: "A unique musical experience with slide guitar maestro Deepak Kshirsagar, blending traditional and contemporary sounds.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Music Pavilion",
    seats: "150 seats available",
    price: "₹1500",
    featured: false,
    category: "Contemporary Music"
  },
  {
    id: 17,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Hindustani vocal by Pt. Sajan Mishra",
    description: "An evening of classical vocal music by the legendary Pandit Sajan Mishra, master of the Banaras gharana.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 18,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Across the Miles - Folk music and dance from Belarus",
    description: "An international cultural exchange featuring traditional folk music and dance performances from Belarus.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "International Stage",
    seats: "300 seats available",
    price: "₹1200",
    featured: false,
    category: "International Folk"
  },
  {
    id: 19,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/birju_maharaj.png",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 20,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Traditional songs of Garhwal, Kumaon, Jaunsar",
    description: "A musical journey through the traditional songs and folk music of Garhwal, Kumaon, and Jaunsar regions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "250 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 21,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Vocal recital by Deborshee Bhattacharjee",
    description: "A classical vocal performance by Deborshee Bhattacharjee, presenting traditional Hindustani classical music.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 22,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Sitar recital by Anupma Bhagwat",
    description: "An enchanting sitar performance by Anupma Bhagwat, showcasing the beauty of classical Indian music.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 23,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Folk forms of Goa",
    description: "Experience the vibrant folk traditions of Goa with traditional music, dance, and cultural performances.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1200",
    featured: false,
    category: "Folk Dance"
  },
  {
    id: 24,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Violin recital by Yadnesh Raikar",
    description: "A mesmerizing violin performance by Yadnesh Raikar, presenting classical compositions with technical brilliance.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 25,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Vocal recital by Omkar Dadarkar",
    description: "A soulful vocal performance by Omkar Dadarkar, presenting classical Hindustani vocal music with traditional ragas.",
    image: "/images/artists/birju_maharaj.png",
    time: "8:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 26,
    day: "Day 7",
    date: "10th October, Friday",
    title: "All women Band from Kirgistan",
    description: "An international performance featuring an all-women band from Kyrgyzstan, showcasing Central Asian musical traditions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "10:00 PM",
    location: "International Stage",
    seats: "250 seats available",
    price: "₹1500",
    featured: false,
    category: "International Music"
  },
  {
    id: 27,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Heritage Quiz",
    description: "Test your knowledge of Indian cultural heritage in this engaging quiz competition with exciting prizes.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "10:00 AM",
    location: "Academic Hall",
    seats: "100 seats available",
    price: "₹500",
    featured: false,
    category: "Educational"
  },
  {
    id: 28,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Folk Theatre – Chakravyuh of Uttarakhand",
    description: "Experience traditional folk theatre from Uttarakhand with the classic tale of Chakravyuh, performed by local artists.",
    image: "/images/artists/ring.png",
    time: "1:00 PM",
    location: "Theatre Hall",
    seats: "200 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Theatre"
  },
  {
    id: 29,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Vocal recital by Prabhakar Diwakar Kashyap",
    description: "A classical vocal performance by Prabhakar Diwakar Kashyap, presenting traditional Hindustani classical music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 30,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Violin recital by Dr. N Rajam",
    description: "An evening of classical violin music by the legendary Dr. N Rajam, master of the Carnatic violin tradition.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Music"
  },
  {
    id: 31,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Virasat Super Bike Rally",
    description: "Witness an exciting display of super bikes and motorcycles, showcasing automotive passion and heritage.",
    image: "/images/artists/birju_maharaj.png",
    time: "10:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Heritage"
  },
  {
    id: 32,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Folk music and dance from Uttarakhand",
    description: "A vibrant showcase of traditional folk music and dance forms from the beautiful state of Uttarakhand.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 33,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Santoor recital by Abhay Sopori",
    description: "An enchanting santoor performance by Abhay Sopori, presenting classical compositions with traditional Kashmiri music.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 34,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Usha Uthup Live in Concert",
    description: "An electrifying performance by the legendary Usha Uthup, bringing her unique blend of Indian and Western music.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹3000",
    featured: true,
    category: "Contemporary Music"
  },
  {
    id: 35,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Sit & Draw",
    description: "A creative workshop where participants can sit and draw, expressing their artistic vision inspired by the festival.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 AM",
    location: "Art Studio",
    seats: "50 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 36,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Saraswati Veena by Ramanna Balachandran",
    description: "A classical veena performance by Ramanna Balachandran, presenting traditional Carnatic music compositions.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "6:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 37,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Flute recital by Pravin Godkhindi",
    description: "A mesmerizing flute performance by Pravin Godkhindi, showcasing the beauty of classical Indian flute music.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 38,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Hindustani vocal by Jayateerth Mewundi",
    description: "A classical vocal performance by Jayateerth Mewundi, presenting traditional Hindustani classical music.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 39,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 40,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 41,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Hindustani vocal by Sashwati Mandal",
    description: "A classical vocal performance by Sashwati Mandal, presenting traditional Hindustani classical music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 42,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Patiala Kathak Ballet by Manjari Chatturvedi",
    description: "A spectacular Kathak ballet performance by Manjari Chatturvedi, presenting the Patiala gharana style.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Dance Theater",
    seats: "250 seats available",
    price: "₹2200",
    featured: true,
    category: "Classical Dance"
  },
  {
    id: 43,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/birju_maharaj.png",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 44,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 45,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Kuchipudi dance by Arunima Kumar",
    description: "A classical Kuchipudi dance performance by Arunima Kumar, showcasing the grace and beauty of this traditional form.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 46,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Hindustani vocal by Parveen Sultana",
    description: "An evening of classical vocal music by the legendary Parveen Sultana, master of the Patiala gharana.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 47,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 48,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 49,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Kathak by Sinjini Kulkarni",
    description: "A classical Kathak dance performance by Sinjini Kulkarni, presenting traditional Kathak compositions.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 50,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Hindustani vocal by Ashwini Bhide",
    description: "A classical vocal performance by Ashwini Bhide, presenting traditional Hindustani classical music.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 51,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Treasure Hunt",
    description: "An exciting treasure hunt activity where participants can explore the festival grounds and discover hidden cultural treasures.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Activity"
  },
  {
    id: 52,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 53,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Flute recital by Debopriya & Shuchismita Chatterjee",
    description: "A mesmerizing flute duet performance by Debopriya and Shuchismita Chatterjee, showcasing classical Indian flute music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 54,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Shaam e Gazal - Ustad Ahmed Mohd Hussain",
    description: "An evening of soulful ghazals by Ustad Ahmed Mohd Hussain, presenting the beauty of Urdu poetry and music.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2200",
    featured: true,
    category: "Ghazal"
  },
  {
    id: 55,
    day: "Concluding Day",
    date: "18th October, Saturday",
    title: "Closing Ceremony",
    description: "Join us for the grand closing ceremony of Virasat Festival 2024, celebrating the successful completion of our cultural journey.",
    image: "/images/artists/birju_maharaj.png",
    time: "6:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹2000",
    featured: true,
    category: "Closing"
  },
  {
    id: 56,
    day: "Concluding Day",
    date: "18th October, Saturday",
    title: "Manoj Tiwari Live",
    description: "A grand finale performance by the popular Bhojpuri singer and politician Manoj Tiwari, bringing the festival to a spectacular close.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "8:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹3000",
    featured: true,
    category: "Contemporary Music"
  }
]

export const EventsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentMobileCard, setCurrentMobileCard] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate total pages (4 cards per page for desktop, 2 for mobile)
  const cardsPerPage = isMobile ? 2 : 4
  const totalPages = Math.ceil(events.length / cardsPerPage)
  
  // Get current page events
  const startIndex = isMobile ? 0 : currentPage * 4
  const endIndex = isMobile ? events.length : startIndex + 4
  const displayedEvents = isMobile ? events : events.slice(startIndex, endIndex)

  // Navigation functions
  const nextPage = () => {
    if (isMobile) {
      setCurrentMobileCard((prev) => Math.min(prev + 1, events.length - 2))
    } else {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }
  }

  const prevPage = () => {
    if (isMobile) {
      setCurrentMobileCard((prev) => Math.max(prev - 1, 0))
    } else {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    }
  }

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return
    
    const scrollLeft = scrollContainerRef.scrollLeft
    const cardWidth = 304 // w-72 + gap = 288 + 16 = 304px
    const currentCard = Math.round(scrollLeft / cardWidth)
    setCurrentMobileCard(Math.min(Math.max(currentCard, 0), events.length - 1))
  }

  // Countdown timer for featured events
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const eventDate = new Date()
      eventDate.setDate(eventDate.getDate() + 3) // 3 days from now
      const distance = eventDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-8 pb-16 px-4 sm:px-6 min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: '#FFF7F5F4',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Earthen floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-brand-earthen/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-brand-brown/15 rounded-full"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-brand-earthen-light/25 rounded-full"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-brand-earthen/10 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        
        {/* Subtle geometric patterns */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-brown/30 rounded-full"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-brand-earthen/40 rounded-full"
          animate={{ 
            scale: [1, 3, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 120, 109, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 120, 109, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
        <div className="container mx-auto max-w-[140rem] relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-brand-black">Cultural Heritage </span>
            <span className="text-brand-brown font-bold">Festival</span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-brand-earthen max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Book your preferred events and immerse yourself in three days of authentic Indian cultural experiences.
          </motion.p>
        </motion.div>


        {/* Events Grid with Navigation */}
        <div className="relative">
          {/* Shadow Containment Wrapper */}
          <div className="relative overflow-hidden rounded-3xl" style={{ contain: 'layout style paint' }}>
            {/* Main Container with Side Navigation */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-4">
            {/* Left Navigation Button - only show on desktop when not on first page */}
            {!isMobile && currentPage > 0 && (
              <motion.button
                onClick={prevPage}
                className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {/* Spacer for when left button is not shown */}
            {!isMobile && currentPage === 0 && <div className="w-12 sm:w-14 h-12 sm:h-14 flex-shrink-0" />}

            {/* Events Grid - native scroll on mobile, 4 cards on desktop */}
            <div 
              ref={setScrollContainerRef}
              className={`flex-1 ${isMobile ? 'flex overflow-x-auto overflow-y-hidden scrollbar-hide px-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-4 sm:gap-6 lg:gap-8`}
              onScroll={handleScroll}
              style={{
                scrollSnapType: isMobile ? 'x mandatory' : 'none',
                scrollBehavior: isMobile ? 'smooth' : 'auto',
                WebkitOverflowScrolling: isMobile ? 'touch' : 'auto',
                contain: 'layout style paint',
                isolation: 'isolate'
              }}
            >
            {(isMobile ? events : displayedEvents).map((event, index) => (
              <motion.div
                key={`${event.id}-${isMobile ? currentMobileCard : currentPage}`}
                initial={isMobile ? false : { opacity: 0, y: 50 }}
                animate={isMobile ? false : { opacity: 1, y: 0 }}
                transition={isMobile ? {} : { duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl ${isMobile ? 'mx-2' : ''} transition-all duration-300 ease-out overflow-hidden flex flex-col ${isMobile ? 'flex-shrink-0 w-72' : ''}`}
                style={{
                  scrollSnapAlign: isMobile ? 'start' : 'none',
                  filter: 'drop-shadow(0 0 0 transparent)'
                }}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Inner white card container */}
                <div className="bg-white rounded-2xl m-1 flex flex-col flex-1 overflow-hidden">
                {/* Event Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                   <motion.img
                     src={event.image}
                     alt={event.title}
                     className="w-full h-full object-cover"
                   />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Day Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-black text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.day}
                    </span>
                  </div>
                  
                  {/* Featured Badge */}
                  {event.featured && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className="bg-brand-red text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                      {/* Countdown Timer */}
                      <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                        <div className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                   {/* Fixed Height Title Section */}
                   <div className="h-14 sm:h-16 mb-3 flex items-start">
                     <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-black font-serif group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-tight">
                       {event.title}
                     </h3>
                   </div>
                  
                  {/* Fixed Height Description Section */}
                  <div className="h-10 sm:h-12 mb-3 sm:mb-4 flex items-start">
                    <p className="text-brand-earthen text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  
                  {/* Fixed Height Separator Section */}
                  <div className="h-5 sm:h-6 mb-3 sm:mb-4 flex items-center">
                    <div className="w-12 sm:w-16 h-1 bg-brand-red rounded-full" />
                  </div>
                  
                   {/* Event Details */}
                   <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-grow">
                     <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                       <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                       <span>{event.time}</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                       <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                       <span>{event.location}</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-earthen group-hover:text-brand-red transition-colors duration-300">
                       <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red flex-shrink-0" />
                       <span>{event.seats}</span>
                     </div>
                   </div>
                  
                  {/* Price and Buy Button */}
                  <div className="flex items-center justify-between gap-2 sm:gap-3 mt-auto px-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-black leading-none">{event.price}</span>
                      <span className="text-xs text-brand-earthen-light leading-tight whitespace-nowrap">per person</span>
                    </div>
                    
                    <Link href={`/events/${event.id}/booking`}>
                      <motion.button
                        className="bg-brand-red hover:bg-brand-red-dark text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 group/btn flex-shrink-0 h-8 sm:h-9"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          console.log('Home page Book Now clicked for event:', event.id, event.title);
                          console.log('Home page Booking URL:', `/events/${event.id}/booking`);
                        }}
                      >
                        <span className="text-xs sm:text-sm whitespace-nowrap">Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
                </div>

              </motion.div>
            ))}
            </div>

            {/* Right Navigation Button - only show on desktop when not on last page */}
            {!isMobile && currentPage < totalPages - 1 && (
              <motion.button
                onClick={nextPage}
                className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-brand-red group flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}

            {/* Spacer for when right button is not shown */}
            {!isMobile && currentPage === totalPages - 1 && <div className="w-12 sm:w-14 h-12 sm:h-14 flex-shrink-0" />}
            </div>
          </div>

          {/* Page Indicator - only show on desktop */}
          {!isMobile && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-brand-red scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
           className="text-center mt-8 sm:mt-12"
        >
          <Link href="/events">
            <motion.button
              className="bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-brown text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Events
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default EventsSection
