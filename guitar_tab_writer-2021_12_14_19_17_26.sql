--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: guitar_tab_writer; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE guitar_tab_writer WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'German_Austria.1252';


ALTER DATABASE guitar_tab_writer OWNER TO postgres;

\connect guitar_tab_writer

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.labels (
    label_id integer NOT NULL,
    user_id integer,
    name character varying
);


ALTER TABLE public.labels OWNER TO postgres;

--
-- Name: labels_label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.labels_label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.labels_label_id_seq OWNER TO postgres;

--
-- Name: labels_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.labels_label_id_seq OWNED BY public.labels.label_id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid text NOT NULL,
    sess json NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: tabs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabs (
    document_id character varying NOT NULL,
    user_id integer
);


ALTER TABLE public.tabs OWNER TO postgres;

--
-- Name: tabs_labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabs_labels (
    tab_id character varying NOT NULL,
    label_id integer NOT NULL
);


ALTER TABLE public.tabs_labels OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying,
    email character varying,
    root_folder character varying,
    CONSTRAINT email_is_email CHECK ((((email)::text ~~ '%@%'::text) AND ((email)::text ~~ '%.__%'::text)))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: labels label_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels ALTER COLUMN label_id SET DEFAULT nextval('public.labels_label_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.labels VALUES (3, 35, 'Beatles');
INSERT INTO public.labels VALUES (4, 35, 'Queen');
INSERT INTO public.labels VALUES (5, 35, 'Soundtracks');
INSERT INTO public.labels VALUES (7, 35, 'Anime');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sessions VALUES ('ckT6Be_n4ZOVNyaqMMov8A62PMTW_ENl', '{"cookie":{"originalMaxAge":7200000,"expires":"2021-12-14T20:10:23.675Z","secure":false,"httpOnly":false,"path":"/","sameSite":true},"userEmail":"hasanovic.a02@htlwienwest.at"}', '2021-12-14 21:10:24');


--
-- Data for Name: tabs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tabs VALUES ('10_W_ONNFhvIR_JagZYJn06AWGZ2o7Ufk21Cd1TSZ8HY', 35);
INSERT INTO public.tabs VALUES ('1pWozU_bKw9z0mApFDLq904-_rNPsr4t8wFUMWKN8pH8', 35);


--
-- Data for Name: tabs_labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tabs_labels VALUES ('10_W_ONNFhvIR_JagZYJn06AWGZ2o7Ufk21Cd1TSZ8HY', 5);
INSERT INTO public.tabs_labels VALUES ('1pWozU_bKw9z0mApFDLq904-_rNPsr4t8wFUMWKN8pH8', 7);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (35, 'Ahmed Hasanovic', 'hasanovic.a02@htlwienwest.at', '1pTJlWy8zutpvg1R6TRHKM8aWk08mgsVg');


--
-- Name: labels_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.labels_label_id_seq', 7, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 35, true);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (label_id);


--
-- Name: sessions session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: tabs_labels tabs_labels_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabs_labels
    ADD CONSTRAINT tabs_labels_pk PRIMARY KEY (label_id, tab_id);


--
-- Name: tabs tabs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabs
    ADD CONSTRAINT tabs_pkey PRIMARY KEY (document_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_session_expire ON public.sessions USING btree (expire);


--
-- Name: labels labels_users_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_users_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tabs_labels tabs_labels_labels_label_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabs_labels
    ADD CONSTRAINT tabs_labels_labels_label_id_fk FOREIGN KEY (label_id) REFERENCES public.labels(label_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tabs_labels tabs_labels_tabs_document_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabs_labels
    ADD CONSTRAINT tabs_labels_tabs_document_id_fk FOREIGN KEY (tab_id) REFERENCES public.tabs(document_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tabs tabs_users_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabs
    ADD CONSTRAINT tabs_users_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TABLE labels; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.labels TO gtw_app;


--
-- Name: SEQUENCE labels_label_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,UPDATE ON SEQUENCE public.labels_label_id_seq TO gtw_app;


--
-- Name: TABLE sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.sessions TO gtw_app;


--
-- Name: TABLE tabs; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tabs TO gtw_app;


--
-- Name: TABLE tabs_labels; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.tabs_labels TO gtw_app;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO gtw_app;


--
-- Name: SEQUENCE users_user_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_user_id_seq TO gtw_app;


--
-- PostgreSQL database dump complete
--

