const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection and models
const { connectDB } = require('./config/database');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample data seeding function (run once to populate database)
const seedDatabase = async () => {
    try {
        const count = await Student.count();
        if (count === 0) {
            const sampleStudents = [
                {
                    registerNumber: '2362342',
                    name: 'LEKHA WADHWA',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 0,
                    individualMarks: 0,
                    remarks: ''
                },
                {
                    registerNumber: '2362351',
                    name: 'Padmaja Shah',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 16,
                    remarks: 'Excellent work'
                },
                {
                    registerNumber: '2362373',
                    name: 'Swarnim Pradhan',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 15,
                    individualMarks: 14,
                    remarks: 'Good progress'
                },
                {
                    registerNumber: '2362376',
                    name: 'Tenzin Palden Bhutia',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 16,
                    individualMarks: 15,
                    remarks: 'Good effort'
                },
                {
                    registerNumber: '2362325',
                    name: 'Drishya S Menon',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 0,
                    individualMarks: 0,
                    remarks: ''
                },
                {
                    registerNumber: '2362333',
                    name: 'Hrishikesh Romesh',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Outstanding performance'
                },
                {
                    registerNumber: '2362366',
                    name: 'Sai Bhuvana S',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 14,
                    individualMarks: 13,
                    remarks: 'Needs improvement'
                },
                {
                    registerNumber: '2362349',
                    name: 'Nicholas Briggs',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 16,
                    individualMarks: 15,
                    remarks: 'Good work'
                },
                {
                    registerNumber: '2362378',
                    name: 'Neha Simon',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 15,
                    individualMarks: 14,
                    remarks: 'Satisfactory'
                },
                {
                    registerNumber: '2362364',
                    name: 'Shambhavi Jaguri',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 20,
                    individualMarks: 19,
                    remarks: 'Excellent implementation'
                },
                {
                    registerNumber: '2362152',
                    name: 'Saksham Insan',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Great work'
                },
                {
                    registerNumber: '2362324',
                    name: 'Diya Chouhan',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Very good'
                },
                {
                    registerNumber: '2362360',
                    name: 'Riya Bajaj',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Well done'
                },
                {
                    registerNumber: '2362372',
                    name: 'Suhaas K',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Excellent work'
                },
                {
                    registerNumber: '2362374',
                    name: 'Tanmay Tejaswi',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Good performance'
                },
                {
                    registerNumber: '2362355',
                    name: 'Rahul S',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 17,
                    individualMarks: 16,
                    remarks: 'Satisfactory'
                },
                {
                    registerNumber: '2362357',
                    name: 'Rewin Arokiya Raj E',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 17,
                    individualMarks: 16,
                    remarks: 'Good effort'
                }
            ];
            await Student.bulkCreate(sampleStudents);
            console.log('Sample data inserted successfully!');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Seed database on startup (after a small delay to ensure connection)
setTimeout(seedDatabase, 1000);

// API Routes
app.post('/api/login', async (req, res) => {
    const { userType, registerNumber, employeeId, password } = req.body;
    
    try {
        if (userType === 'student') {
            const student = await Student.findOne({ 
                where: { registerNumber } 
            });
            
            if (student) {
                res.json({ 
                    success: true, 
                    user: { 
                        id: registerNumber, 
                        name: student.name,
                        type: 'student'
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            // Teacher login - accept any credentials for demo
            res.json({ 
                success: true, 
                user: { 
                    id: employeeId, 
                    name: 'Teacher',
                    type: 'teacher'
                }
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/student/:regNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ 
            where: { registerNumber: req.params.regNumber } 
        });
        
        if (student) {
            // Format response to match frontend expectations
            const formattedStudent = {
                group: student.groupNumber,
                name: student.name,
                project: student.project,
                contact: student.contact,
                members: student.members,
                status: student.status,
                progress: student.progress,
                domain: student.domain,
                class: student.className,
                marks: {
                    domain: student.domainMarks,
                    individual: student.individualMarks
                },
                remarks: student.remarks
            };
            res.json(formattedStudent);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/student/:regNumber/progress', async (req, res) => {
    const { progress } = req.body;
    
    try {
        const student = await Student.findOne({ 
            where: { registerNumber: req.params.regNumber } 
        });
        
        if (student) {
            student.progress = Math.min(Math.max(progress, 0), 100);
            if (student.progress === 100) {
                student.status = 'Completed';
            } else if (student.progress > 0) {
                student.status = 'In Progress';
            }
            
            await student.save();
            
            // Format response
            const formattedStudent = {
                group: student.groupNumber,
                name: student.name,
                project: student.project,
                contact: student.contact,
                members: student.members,
                status: student.status,
                progress: student.progress,
                domain: student.domain,
                class: student.className,
                marks: {
                    domain: student.domainMarks,
                    individual: student.individualMarks
                },
                remarks: student.remarks
            };
            
            res.json({ success: true, student: formattedStudent });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const students = await Student.findAll();
        
        // Convert to object format for compatibility with frontend
        const projectData = {};
        students.forEach(student => {
            projectData[student.registerNumber] = {
                group: student.groupNumber,
                name: student.name,
                project: student.project,
                contact: student.contact,
                members: student.members,
                status: student.status,
                progress: student.progress,
                domain: student.domain,
                class: student.className,
                marks: {
                    domain: student.domainMarks,
                    individual: student.individualMarks
                },
                remarks: student.remarks
            };
        });
        
        res.json(projectData);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/student/:regNumber/marks', async (req, res) => {
    const { marks, remarks } = req.body;
    
    try {
        const student = await Student.findOne({ 
            where: { registerNumber: req.params.regNumber } 
        });
        
        if (student) {
            if (marks) {
                if (marks.domain !== undefined) student.domainMarks = marks.domain;
                if (marks.individual !== undefined) student.individualMarks = marks.individual;
            }
            if (remarks !== undefined) {
                student.remarks = remarks;
            }
            
            await student.save();
            
            // Format response
            const formattedStudent = {
                group: student.groupNumber,
                name: student.name,
                project: student.project,
                contact: student.contact,
                members: student.members,
                status: student.status,
                progress: student.progress,
                domain: student.domain,
                class: student.className,
                marks: {
                    domain: student.domainMarks,
                    individual: student.individualMarks
                },
                remarks: student.remarks
            };
            
            res.json({ success: true, student: formattedStudent });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Update marks error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Additional endpoints for better functionality
app.post('/api/student', async (req, res) => {
    try {
            const sampleStudents = [
                {
                    registerNumber: '2362342',
                    name: 'LEKHA WADHWA',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 0,
                    individualMarks: 0,
                    remarks: ''
                },
                {
                    registerNumber: '2362351',
                    name: 'Padmaja Shah',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 16,
                    remarks: 'Excellent work'
                },
                {
                    registerNumber: '2362373',
                    name: 'Swarnim Pradhan',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 15,
                    individualMarks: 14,
                    remarks: 'Good progress'
                },
                {
                    registerNumber: '2362376',
                    name: 'Tenzin Palden Bhutia',
                    groupNumber: 1,
                    project: 'Website for the AIML and Data Science departments',
                    contact: 'Dr. Michel',
                    members: ['LEKHA WADHWA (2362342)', 'Padmaja Shah (2362351)', 'Swarnim Pradhan (2362373)', 'Tenzin Palden Bhutia (2362376)'],
                    status: 'Started',
                    progress: 65,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 16,
                    individualMarks: 15,
                    remarks: 'Good effort'
                },
                {
                    registerNumber: '2362325',
                    name: 'Drishya S Menon',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 0,
                    individualMarks: 0,
                    remarks: ''
                },
                {
                    registerNumber: '2362333',
                    name: 'Hrishikesh Romesh',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Outstanding performance'
                },
                {
                    registerNumber: '2362366',
                    name: 'Sai Bhuvana S',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 14,
                    individualMarks: 13,
                    remarks: 'Needs improvement'
                },
                {
                    registerNumber: '2362349',
                    name: 'Nicholas Briggs',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 16,
                    individualMarks: 15,
                    remarks: 'Good work'
                },
                {
                    registerNumber: '2362378',
                    name: 'Neha Simon',
                    groupNumber: 2,
                    project: 'ERP module for department research and publications',
                    contact: 'Dr. SANDEEP KUMAR',
                    members: ['Drishya S Menon (2362325)', 'Hrishikesh Romesh (2362333)', 'Sai Bhuvana S (2362366)', 'Nicholas Briggs (2362349)', 'Neha Simon (2362378)'],
                    status: 'Started',
                    progress: 45,
                    domain: 'Database Management',
                    className: 'AIML-B',
                    domainMarks: 15,
                    individualMarks: 14,
                    remarks: 'Satisfactory'
                },
                {
                    registerNumber: '2362364',
                    name: 'Shambhavi Jaguri',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 20,
                    individualMarks: 19,
                    remarks: 'Excellent implementation'
                },
                {
                    registerNumber: '2362152',
                    name: 'Saksham Insan',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Great work'
                },
                {
                    registerNumber: '2362324',
                    name: 'Diya Chouhan',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Very good'
                },
                {
                    registerNumber: '2362360',
                    name: 'Riya Bajaj',
                    groupNumber: 4,
                    project: 'Project Evaluation Web Application',
                    contact: 'Dr. BIJEESH T V',
                    members: ['Shambhavi Jaguri (2362364)', 'Saksham Insan (2362152)', 'Diya Chouhan (2362324)', 'Riya Bajaj (2362360)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-A',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Well done'
                },
                {
                    registerNumber: '2362372',
                    name: 'Suhaas K',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 19,
                    individualMarks: 18,
                    remarks: 'Excellent work'
                },
                {
                    registerNumber: '2362374',
                    name: 'Tanmay Tejaswi',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 18,
                    individualMarks: 17,
                    remarks: 'Good performance'
                },
                {
                    registerNumber: '2362355',
                    name: 'Rahul S',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 17,
                    individualMarks: 16,
                    remarks: 'Satisfactory'
                },
                {
                    registerNumber: '2362357',
                    name: 'Rewin Arokiya Raj E',
                    groupNumber: 5,
                    project: 'Internship Evaluation Web Application',
                    contact: 'Dr. ARUL V',
                    members: ['Suhaas K (2362372)', 'Tanmay Tejaswi (2362374)', 'Rahul S (2362355)', 'Rewin Arokiya Raj E (2362357)'],
                    status: 'Completed',
                    progress: 100,
                    domain: 'Web Development',
                    className: 'AIML-C',
                    domainMarks: 17,
                    individualMarks: 16,
                    remarks: 'Good effort'
                },
            ];
        
        if (result > 0) {
            res.json({ success: true, message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get students by group
app.get('/api/group/:groupNumber', async (req, res) => {
    try {
        const students = await Student.findAll({
            where: { groupNumber: req.params.groupNumber }
        });
        res.json(students);
    } catch (error) {
        console.error('Get group error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get students by class
app.get('/api/class/:className', async (req, res) => {
    try {
        const students = await Student.findAll({
            where: { className: req.params.className }
        });
        res.json(students);
    } catch (error) {
        console.error('Get class error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});