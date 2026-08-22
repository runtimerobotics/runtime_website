---
layout: ../layouts/BlogPostLayout.astro
title: "10 years of Remote ROS Development & Training, What are the key lessons learned?"
description: "Introduction In this article, I would like to go through my 10-year journey as a remote ROS Developer and share the key lessons that I have learned. My name is  Lentin Joseph; I ha"
date: "2024-02-14T12:16:34"
---
## **Introduction**

In this article, I would like to go through my 10-year journey as a remote ROS Developer and share the key lessons that I have learned.  
  
My name is  [Lentin Joseph](https://www.linkedin.com/in/lentinjoseph/); I have been a  ROS Developer & Educator since 2010. I am the Co-Founder of [RUNTIME Robotics](https://www.linkedin.com/company/runtimerobotics/) and the [author of 10 books](https://robocademy.com/product-category/robotics/) on ROS. If you are interested in reading my whole journey in robotics first, start from the beginning of the post or jump to the respective sections below.

Table of Contents

[Toggle](#)

-   [Introduction](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Introduction)
-   [How did I start with Robotics?](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#How_did_I_start_with_Robotics)
    -   [Childhood](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Childhood)
    -   [College Days](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#College_Days)
    -   [Getting to know about ROS](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Getting_to_know_about_ROS)
    -   [Started Blogging](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Started_Blogging)
    -   [Understanding the Reality of Robotics](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Understanding_the_Reality_of_Robotics)
-   [Starting a career in Remote ROS Development](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Starting_a_career_in_Remote_ROS_Development)
    -   [Journey as an Author of ROS books](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Journey_as_an_Author_of_ROS_books)
    -   [Getting Clients from books](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Getting_Clients_from_books)
    -   [Creating a micro team](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Creating_a_micro_team)
    -   [Passion for teaching Robotics and ROS](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Passion_for_teaching_Robotics_and_ROS)
    -   [Upgrading skills in Robotics](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Upgrading_skills_in_Robotics)
-   [Career Challenges as a Remote ROS Developer](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Career_Challenges_as_a_Remote_ROS_Developer)
    -   [Maintaining client relationships](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Maintaining_client_relationships)
    -   [Hardware dependencies](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Hardware_dependencies)
    -   [Time zone differences](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Time_zone_differences)
    -   [Less Requirement of ROS projects](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Less_Requirement_of_ROS_projects)
    -   [Constant updation and validation](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Constant_updation_and_validation)
    -   [Financial uncertainties](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Financial_uncertainties)
    -   [Employee volatility](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Employee_volatility)
-   [The best part of the Career](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#The_best_part_of_the_Career)
    -   [Variety of projects](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Variety_of_projects)
    -   [Work Flexibility](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Work_Flexibility)
    -   [Enough learning opportunities](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Enough_learning_opportunities)
    -   [Remote work & WFH](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Remote_work_WFH)
    -   [Opportunities to go on-site](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Opportunities_to_go_on-site)
-   [Take a break from Work](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Take_a_break_from_Work)
-   [Why did I start RUNTIME Robotics?](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Why_did_I_start_RUNTIME_Robotics)
    -   [How are the projects going now?](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#How_are_the_projects_going_now)
-   [What are the key lessons learned?](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#What_are_the_key_lessons_learned)
    -   [You are replaceable](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#You_are_replaceable)
    -   [Your work has to speak, not your name](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Your_work_has_to_speak_not_your_name)
    -   [Compete with yourself, not with others](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Compete_with_yourself_not_with_others)
    -   [Relationships with clients are important](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Relationships_with_clients_are_important)
    -   [You can be outdated anytime](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#You_can_be_outdated_anytime)
    -   [A good professional network helps](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#A_good_professional_network_helps)
    -   [Attend technology conferences](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Attend_technology_conferences)
    -   [Keep relevant and visible online](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Keep_relevant_and_visible_online)
    -   [Honesty is valuable](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Honesty_is_valuable)
    -   [Your health matters more than money](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Your_health_matters_more_than_money)
    -   [Don’t fake](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Dont_fake)
    -   [Be nice and supportive of your colleagues](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Be_nice_and_supportive_of_your_colleagues)
    -   [Your character matters more than money](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Your_character_matters_more_than_money)
    -   [People can be selfish, choose people wisely](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#People_can_be_selfish_choose_people_wisely)
    -   [Contribute to Open Source and share knowledge](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Contribute_to_Open_Source_and_share_knowledge)
    -   [Be active on Linkedin](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Be_active_on_Linkedin)
    -   [Take a break: Work is not everything](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Take_a_break_Work_is_not_everything)
-   [Is it worth being a Remote ROS Developer?](https://runtimerobotics.com/10-years-of-ros-consulting-and-training-what-did-i-learn/#Is_it_worth_being_a_Remote_ROS_Developer)

## How did I start with Robotics?

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-father-son-making-robot-min-1024x690-d2b261bc.jpg)

### **Childhood**

I remember my interest in electronics began while I was in 4th grade. The influence was mainly from my father who was working as an electrician at the time.   
  
Later, that interest grew to other technologies like computers.   

###   
College Days

I chose my undergrad in _Electronics engineering_ because of my passion for all these technologies. In the final year of my engineering, I found a domain where I could blend in all of my interests, which was Robotics. As we all know robotics is an interdisciplinary study which involves many branches of engineering.   
  
I was happy to find a domain where I could work in all my favourite domains. In 2010, I created my first robot which was part of the final year Academic project. The project was a social robot which can interact with humans. 

That project got attention from multiple media. I would say this was the start of my journey in robotics.  

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-collage-1024x768-cba780a3.jpg)

Undergrad Robotics Project: Social Robot

###   
Getting to know about ROS

One of my friends made an autonomous mobile robot using a framework called R.O.S. I didn’t hear about ROS at that time, I was doing my project using Python and C++, not using ROS. When I started reading about ROS then, I found difficulty in understanding. So, I told my friend that this project was difficult to make. His project using ROS was not so successful, but I kept an eye on the framework he used.

After my project, I started researching this framework more deeply; truth be told, I fell in love with this framework. The main reason is that I am a big fan of open-source projects. ROS is an open-source framework which can be used in robots.   
  
Since that moment, I have started learning ROS.

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-ros1-1024x749-d514fbb4.png)

###   
Started Blogging

After my undergrad, I started to learn ROS and created a blog called [Technolabsz](http://www.technolabsz.com/) in 2011.

I was publishing content mainly in robotics, Linux and electronics. My motivation for starting a tech blog was primarily my interest in technical writing and teaching.

I remember I started making videos on YouTube at that time on ROS 🙂.

  
  

### Understanding the Reality of Robotics

After college, I got a position in a Robotics company, called [ASIMOV Robotics](https://www.asimovrobotics.com/), where I learned what robotics is. I found out that robotics is not as easy as I expected. It is full of math and algorithms. What I worked till was mainly on the application side. I decided to learn more about robotics. Especially the theoretical side of it. Along with that, I have started working more on C++, Python, ROS and robotic simulators.   
  

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-origin-1024x681-b2f0a783.jpg)

[Source](https://www.therobotreport.com/industry-reaction-rethink-robotics/)

  
I was doing my blogging when I was learning something new. The experience that I gained from this robotics startup gave me the immense confidence to start a company of my own. 

My inclination was mainly towards ROS and I focused more on the software side rather than the hardware. I know how to build robot prototypes but my inclination was more on the software side.  

##   
Starting a career in Remote ROS Development  

After resigning from ASIMOV Robotics, I started doing freelancing work mainly in ROS. My blog attracted a lot of viewers at that time and I was getting a good number of projects.  
  
In 2014, I started [QBOTICS LABS](https://qboticslabs.com/), a solution provider in robot software development, embedded system firmware development and computer vision application.  

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-remote_work-1024x683-35286ee4.jpg)

  
I rented a small office near my village in Kochi/Kerala and started doing projects.   
  
I hired a few interns during this time, and we developed an autonomous food-delivery robot prototype robot for a client. This project got some attention in some exhibitions.  
  
I would say this was indeed a good start to my remote ROS development career.

### **Journey as an Author of ROS books**

After starting the company, I got invited to write a book about Python and Robotics. I accepted that offer thinking that it was easy, but it was the opposite.  
  
It was very tough for me in the beginning. I was doing ROS projects and writing books as well. It has taken almost 1 year to complete the book. I still remember the moment I released my book. It was great.  
  
The book got good attention from readers and I was happy as well that the book is working out.

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-books-768x343-1-bb882df0.png)

List of my books

### **Getting Clients from books**

After writing one book, I started understanding the benefits of it. One of the benefits is getting a handful of ROS projects. As an author, different companies approached me to provide ROS solutions.  
  
These projects helped my company to grow financially.  

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-9599301-1024x1024-9c977135.jpg)

  
During this time, I got another opportunity to author another book titled _‘Mastering ROS for Robotics Programming’_. I liked that title and agreed to do that project as well.  
  
From 2014 to 2024, I have authored/co-authored 10 books and reviewed more than 10 robotics books as well. This created an organic flow of projects for my company. I remember I forgot even promote my company because I had a handful of projects. 

###   
**Creating a micro team**

From 2014, I was working alone or collaborating with other ROS developers remotely. I have found remote working for ROS-related projects is doable, but there are challenges if there is robot hardware. I will mention those challenges in the _Career Challenges_ section.  

### **Passion for teaching Robotics and ROS**

I have been conducting different ROS workshops along with my work from 2010. 

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-everyone-is_2-1024x683-d527e587.jpg)

Teaching is my passion, but I didn’t make it full-time. So far, I have trained over 3000 students online and offline. I am taking several workshops on ROS 2 in India and running an online class called ROS Developer Learning Path 2.0 in our Robot Blog: [Robocademy](https://robocademy.com/). 

### **Upgrading skills in Robotics**

I have been constantly upgrading my knowledge of robotics by doing different online/offline courses and attending multiple robotics challenges. I attended an offline Master’s program in Robotics and Automation during 2016-2018. I was also working and writing books during this time. I also attended several robotics challenges like [HRATC as part of ICRA and won the first prize](https://www.linkedin.com/pulse/won-first-prize-hratc-2016-competition-part-icra-lentin-joseph/). Attending different robotics courses and challenges improved my skills in robotics. I am doing my knowledge upgrade regularly to stay relevant in the field.

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-hratc-1024x404-c10b174b.jpeg)

Winner of the HRATC 2016, Challenge as a part of ICRA 2016: It was a ROS-based challenge

##   
**Career Challenges as a Remote ROS Developer**

Here are the multiple challenges I have faced during my career.  

### **Maintaining client relationships**

Working with different clients is not an easy task. We have to maintain a good relationship throughout the project as well as after delivering the project. This may not always happen. It could be some mistakes from us or the client. There can be disputes between clients regarding project requirements and milestones. If there is any dispute, we have to initiate actions to settle it.  

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-business-people_-1024x683-910a7696.jpg)

Managing clients and doing projects is a challenge in this career. If you are a tech-only person entering into this career, try to improve your people management skills to survive in this industry.

###   
**Hardware dependencies**

If we are working only on the robot software and simulation side, we don’t have any issues working remotely. But if we work on an actual robot, then there will be some challenges. I am not saying we can’t work on a physical robot remotely, but we may need some help from the client side. In this situation, I will request clients to put a junior engineer to interact with the robot and communicate with us.  
  
Usually, we will have full access to the robot computer. We can access the robot desktop and terminal remotely. We are using [dwservice](https://www.dwservice.net/) for remote access. I got the recommendation for this tool from one of the clients. We have used anydesk, ttyshare etc, but dwservice gave the best service so far. The latency of this tool is very low. Even the GUI will work flawlessly.

### **Time zone differences**

We are working from India and most of the clients are from the USA, UK and EU regions. Mostly we will find a common time when we can do an online meeting and share our updates. The time zone difference will not affect software development, but it’s a challenge sometimes where we need to work together for a long time. Usually, we will adjust our time based on client time.

### **Less Requirement of ROS projects**

If we compare web and mobile app projects, the number of ROS projects is less. We can find some ROS requirements from freelancing websites like Upwork. To get more projects, it is very important to have a good portfolio, a good network and a great web presence. So, I will say It is not easy to get a ROS project. 

### **  
Constant updation and validation**

Like any other software framework, robotics software is also changing. When I started with ROS, it was the ROS 1 version, now it is ROS 2. Also, there are multiple simulators like NVIDIA Isacc Sim, Webots etc came along with the Gazebo simulator. Learning new technologies is a big part of being a ROS developer like any other software engineer. So constant updation of the latest robotics technology and creating new portfolios is very important for this career.

### **Financial uncertainties**

There will be a risk in any business. Getting consistent projects and making revenue is challenging as a remote ROS developer. Many companies are successful and doing well in this. The start of RUNTIME Robotics is because of my confidence in this domain and confidence in getting clients. That being said, project uncertainties and financial uncertainties can still hit me. I am still struggling to get good ROS projects and clients.

### **Employee volatility**

Creating a team of good ROS developers is not difficult in India. We can hire the best brains from India, but volatility is also higher in this domain. The salary should be competitive to maintain a good team. We also should provide a good work-life balance and a positive work environment. 

## **The best part of the Career**

Here are the main reasons why I chose this career

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-close-up_-1024x683-0777df91.jpg)

### **Variety of projects**

We can choose the project that we are doing. We usually choose different ROS projects that increase the domain knowledge and give more exposure to ROS.

### **Work Flexibility**

You can either do projects one after another or you can take a break and take projects. That is all up to us. Being a remote ROS developer, we could start work when we needed to.

### **Enough learning opportunities**

We can work on multiple projects. The learning and exposure we are getting from this are so high.

### **Remote work & WFH**

We prefer remote work & working from home instead of going to the office. This career enables us to do permanent work from home.

### **Opportunities to go on-site**

There are opportunities to go abroad and meet clients onsite and do training and support.

## **Take a break from Work**

In 2020, after 6-years of doing projects and writing books, we (me & my wife) decided to take intermittent breaks. The main reason for taking a break was COVID. COVID taught us how short our life is.  
  
We planned to travel to **40 countries** **in 2 years**. We kept on doing ROS projects and after completing each project, we took a 2 to 3-month break for travel.  
  
In 2023-Nov-15, we touched our 40th country, which is the USA. The main objective was to attend ROSCon 2023. Our travel stories got featured in multiple media in India. 

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-news_collage-1024x1024-af84a2a9.jpg)

## **Why did I start RUNTIME Robotics?**  

I started [QBOTICS LABS](https://qboticslabs.com/) in 2014. Initially, my thought was to work on multiple domains other than robotics. But as the years passed, the projects that I was getting were more into ROS. The main reason was my ROS books. So after 10 years, I decided to start a new venture which is only focussing on ROS.  
  
RUNTIME Robotics is completely into ROS-based robotics solutions and training.

### **How are the projects going now?**

After our trip, we restarted our operation in January 2024. We started the industrial and academic training in ROS and also started with multiple short projects.  
  
We are looking for more project collaboration now.  
  
**[Please let us know if you are interested in doing a project collaboration.](https://runtimerobotics.com/#contact)**

## **What are the key lessons learned?**

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-close-up-idea-concept-1024x683-e167e99f.jpg)

In my 10-year journey as a remote ROS Developer, I learned many valuable lessons. Here are a few

### **You are replaceable**

This is one of the important lessons that I learned over this time. We may be skilled in some domains, but that doesn’t mean that you are not replaceable. You can get replaced if a better person comes. Businesses will look for profits. If you are not worth it for them, they will try to replace you for sure.

### **Your work has to speak, not your name**

It’s good to create a reputation in the field we are working. Those reputations may be good for getting projects, but after getting projects, your work has to speak. Make sure you are consistent in delivering good work.    

### **Compete with yourself, not with others**

If you are running a business, you can see players who are working in the same domain. In my experience, there is no point in competing with others. Focus on yourself, improve yourself. Thinking about the competition will distract us from our actual goal. 

### **Relationships with clients are important**

A business can grow and survive if we have good clients. Keeping a good relationship with clients by delivering good work. It may not always happen, sometimes the attitude of the client may not match with us, and maybe there may be disputes. Forget about those clients, but try to keep clients who support you and understand you. 

### **You can be outdated anytime**

Keeping up to date with the latest robotics technology is mandatory in this career. You can be outdated anytime. For example, if I am a master of some technology and if a new one comes, whoever learns that technology faster will be the expert of it. I am still a fresher if new technology comes. So we should have a mindset for continuous learning.

### **A good professional network helps**

Keeping good connections will help you at some point of time in your career. If you don’t have projects, you can ask in your network. You can talk to multiple people. A good network can help you to get projects and survive in this career.

### **Attend technology conferences**

I used to attend various robotics technology conferences like ICRA, ROSCon, IROS, RSS etc to get connections. We can meet people, network and ask for opportunities if any. Conferences helped me to meet the real people that I am connected with on social media.

![](/wp-media/10-years-of-ros-consulting-and-training-what-did-i-learn-group__-1-1024x683-d3efef93.jpg)

ROSCon 2013 at New Orleans, USA, Note: I am sitting on the front right 🙂

### **Keep relevant and visible online**

I found staying relevant by creating content and contributing to open source is important in this career.  I found LinkedIn useful for building a professional network in the field of ROS. There are many companies, and groups focusing on ROS. I can see their latest updates and I can share different content as well. I found staying relevant and visible online is very important to get projects.

### **Honesty is valuable**

There are many situations to lie to the client related to the project. But I will say, don’t do that. Keep honest all the time. One lie can damage your relationship with the client and the client may not approach you next time. Taking shortcuts by telling lies may not be a good idea in the long run.

### **Your health matters more than money**

Here is the hard reality of this career. Working remotely may reduce the chances of movement. If you are not doing proper exercise or going to the gym, it can affect your health for sure.  If you have health issues, then you can use your hard-earned money at the hospital.  
  
Usually, we will not talk much about mental health. Just imagine how a robot behaves with bad software on it. If our mental health is bad, it will affect our work. Practice meditation regularly to reduce stress and keep your mind calm. Try to reduce distractions from social media as well. Plan a fixed time for social media. Talk to friends and parents if you are going through depression. Remote work may lead to depression because of a lack of Vitamin D. Physical and mental exercise will keep us in a better position for remote work.

### **Don’t fake**

Faking skills to get contracts may not be a good option in the long run. It will not stay for long, because when you start doing projects you will fail for sure. It will mostly end up in a dispute with a client.

### **Be nice and supportive of your colleagues**

If you are an experienced ROS developer and working with juniors on projects, there are chances of showing dominance. I think exhibiting dominance to juniors nowadays will negatively impact productivity. I will always try to become nicer and more supportive because then only we can maximize their performance. I do not consider juniors as inferior to me, but they know things that I may not know. So use their knowledge and skills to improve overall productivity.

### **Your character matters more than money**

At the end of the day, money matters for a business. But I will say, more than money, you should become a good human being. If your character is lost while making money, then I am not seeing any use. So try to be a good human in the process of money making.

### **People can be selfish, choose people wisely**

People can be selfish sometimes. Sometimes they will use you and throw you away for their benefit. So choosing collaborators is tricky, make sure both parties will benefit from the collaboration. You can revise the decision of collaborations whenever you have a bad experience with them.

### **Contribute to Open Source and share knowledge**

Open source contributions and sharing knowledge in social media can enhance your visibility in your technology domain.

### **Be active on Linkedin**

The LinkedIn platform helped me to build a good network and visibility. I think sharing useful posts on LinkedIn will help you in some way.

### **Take a break: Work is not everything**

Work is not everything. We have to find some personal time to do our other interests as well.  It can be some hobby, travelling or spending time with family etc. I think taking a break will enhance productivity. I have personal experience with taking small breaks from work and it improved my productivity.

## **Is it worth being a Remote ROS Developer?**

I chose this career because of the following reasons.

-   **Interest in working on different ROS robotics projects remotely**: This may not be possible if I am working for a corporation.
-   **Freedom to choose my projects.**
-   **Freedom to do side hustles like creating an online course or writing books:** This can be tough if I am working in a corporation. 
-   **Create multiple streams of revenue:** This may not be possible if we are working in a corporation.
-   **Fewer office politics in a micro-team:** I think our mental health affects work productivity. If our work environment has fewer politics, I think productivity will be also high.
-   **Creative freedom**: If we are working in a corporation, there will be some restrictions on creative new project ideas and implementing them.

These are the key things that I am getting from my career. 

You can also find the career challenges in the above section. According to me, choosing this **profession was the right decision** I took. This decision is personal. **Truth be told, I don’t know if this career is worth it for others**. 

Hope you enjoyed reading the post. If you like it, share it with your friends.

**Also, please [write to us for project](https://runtimerobotics.com/#contact) collaboration.**

Thanks

[**Lentin Joseph**](https://www.linkedin.com/in/lentinjoseph/)
