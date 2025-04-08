 import React, { useState }      from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
import { ToastContainer, toast } from "react-toastify";

// Import styled components from indexStyle.js
import {
  StyledContainer,
  StyledLink,
  SectionTitle,
  StyledButton,
  DialogTitleStyled,
  CheckIconStyled,
  AccordionTitle,
  IconWrapper,
  ContactCard,
  FormWrapper,
  TicketMessage,
  StyledTextField,
} from "./indexStyle";

function Support() {
  const [formData, setFormData] = useState({ subjectType: "", message: "" });
  const [openModal, setOpenModal] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleRequest = async () => {
    if (!formData.subjectType) {
      toast.error("Subject is required.");
      return;
    }

    if (!formData.message) {
      toast.error("Message is required.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      console.log("Sending payload:", formData);

      // Simulate API response
      const response = { success: true, ticketId: "LMS12345" };

      if (response?.success) {
        toast.success("Ticket generated successfully!");
        setTicketId(response.ticketId);
        setOpenModal(true);
        setFormData({ subjectType: "", message: "" });
      } else {
        toast.error("Failed to generate ticket. Invalid response from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to submit the ticket. Please try again.");
      toast.error("Failed to submit the ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Typography className="color underline" variant="body1">
          <StyledLink   to={"/ticket-history"}>
          
         Check Ticket History</StyledLink>
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />

      <SectionTitle variant="h4" className="section_title" gutterBottom>
        Learning Management System
      </SectionTitle>
      <Typography variant="subtitle1"   className= " subtitle1" color="textSecondary">
        Get help with your courses, assignments, and other LMS-related issues.
        Contact our support team or explore our resources below.
      </Typography>
       {/* Contact Information Section */}
      <Grid container spacing={2} mb={6}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              <ContactCard>
                <Typography variant="h6">Call Us</Typography>
                <Typography variant="body1" color="textSecondary">
                  1800-123-4567
                </Typography>
              </ContactCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <IconWrapper>
                <EmailIcon />
              </IconWrapper>
              <ContactCard>
                <Typography variant="h6">Email Us</Typography>
                <Typography variant="body1" color="textSecondary">
                  support@lms.com
                </Typography>
              </ContactCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <IconWrapper>
                <HelpIcon />
              </IconWrapper>
              <ContactCard>
                <Typography variant="h6">Help Center</Typography>
                <Typography variant="body1" color="textSecondary">
                  Explore FAQs to get quick answers.
                </Typography>
              </ContactCard>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ticket Generation Section */}
      <FormWrapper>
        <SectionTitle variant="h4" gutterBottom>
          Generate a Ticket
        </SectionTitle>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Use the form below to create a support ticket. Our team will assist
          you as soon as possible.
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <StyledTextField
            label="Subject"
            name="subjectType"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.subjectType}
            onChange={handleChange}
          />
          <StyledTextField
            label="Enter Your Message"
            name="message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.message}
            onChange={handleChange}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          <Box display="flex" justifyContent="flex-end">
            <StyledButton
              variant="contained"
              size="large"
              onClick={handleRequest}
              disabled={loading || !formData.subjectType || !formData.message}
            >
              {loading ? "Submitting..." : "Request"}
            </StyledButton>
          </Box>
        </Box>
      </FormWrapper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitleStyled>Support Center</DialogTitleStyled>
        <DialogContent>
          <Box textAlign="center">
            <Fade in={showCheck} timeout={1000}>
              <CheckIconStyled />
            </Fade>
            <TicketMessage>
              Your ticket ID is: <strong>{ticketId}</strong>
            </TicketMessage>
            <Typography variant="body2" color="textSecondary">
              Thank you for reaching out! Our support team will assist you soon.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseModal}>Close</StyledButton>
        </DialogActions>
      </Dialog>

      {/* FAQ Section */}
      <Box mb={8}>
        <SectionTitle variant="h4" gutterBottom>
          Frequently Asked Questions
        </SectionTitle>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle>How do I enroll in a course?</AccordionTitle>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To enroll in a course, navigate to the "Courses" section, select the
              desired course, and click "Enroll." Follow the instructions to complete
              the enrollment process.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle>How do I reset my password?</AccordionTitle>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To reset your password, click on "Forgot Password" on the login page.
              Enter your registered email address, and follow the instructions sent to
              your email.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle>Where can I find my grades?</AccordionTitle>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can find your grades in the "Grades" section of your dashboard.
              Select the course to view detailed grade reports.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Additional Resources Section */}
      <Box>
        <SectionTitle variant="h4" gutterBottom>
          Additional Resources
        </SectionTitle>
        <List>
          <ListItem>
            <ListItemText
              primary="Course Enrollment Guide"
              secondary="Learn how to enroll in courses and manage your learning journey."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Video Tutorials"
              secondary="Explore our tutorials to get step-by-step guidance on using the LMS platform."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Student Handbook"
              secondary="Download the handbook for detailed information about the LMS platform."
            />
          </ListItem>
        </List>
      </Box>
    </StyledContainer>
  );
}

export default Support;




import { color, styled } from "@mui/system";
import { Container, Typography, Button, DialogTitle, Box, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc", // Default border color
    },
    "&:hover fieldset": {
      borderColor:"#ccc", // No border on hover
    },
    "&.Mui-focused fieldset": {
        borderColor: "#ccc", // Custom color when focused
    },
  },
});

export const StyledContainer = styled(Container)({
  marginTop: "2rem",
   ' & .color':{
    color: "#ff4500",
   },
   ' & .underline':{
    textDecoration: "underline",
   },
   ' & .subtitle1':{
    marginBottom: "5px",
    fontSize: "1.04rem",   },
    ' & .section_title':{
        
    },

});

export const StyledLink = styled(Link)({
  textDecoration: "underline",
  color: "#ff4500",
  fontWeight: "bold",
});

export const SectionTitle = styled(Typography)({
  color: "#ff4500",
  marginBottom: "1.5rem", // Matches `mb={6}`
  textAlign: "center",
  
});

export const StyledButton = styled(Button)(({ disabled }) => ({
  backgroundColor: disabled ? "#aba1a1" : "#ff4500",
  color: "#fff",
}));

export const DialogTitleStyled = styled(DialogTitle)({
  textAlign: "center",
  fontSize: 30,
  color: "#ff4500",
});

export const CheckIconStyled = styled(CheckCircleIcon)({
  fontSize: 80,
  color: "rgb(255 69 0 / 78%)",
});

export const AccordionTitle = styled(Typography)({
  color: "#ff4500",
});

export const IconWrapper = styled(Box)({
  color: "#ff4500",
  fontSize: "large",
  display: "flex", // Use flexbox for centering
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "50px", // Reduced height from 100px to 50px
});

export const ContactCard = styled(Box)({
  marginTop: "0.5rem", // Reduced margin from 1rem to 0.5rem
  textAlign: "center",
});

export const FormWrapper = styled(Box)({
  marginTop: "2rem", // Matches `mt={2}`
  marginBottom: "2rem", // Matches `mb={8}`
});

export const TicketMessage = styled(Typography)({
  marginTop: "1rem", // Matches `mt={2}`
  fontSize: "20px",
  textAlign: "center",
});

