'use client';
import React from 'react';
import { Button } from '@nextui-org/react';

const InviteSection = () => {
  return (
    <div className="invite-section">
      <h1 className="header center" data-aos="zoom-out-up" data-aos-duration="1500" style={{ paddingBottom: '10px' }}>
        Invite Bot Now!
      </h1>
      <div data-aos="flip-up" data-aos-duration="1500" className="row d-flex justify-content-center">
        <Button
          as="a"
          href="https://discord.com/api/oauth2/authorize?client_id=729046239181668397&permissions=139586817088&scope=bot%20applications.commands"
          auto
          flat
          className="add-bot-btn btn btn-primary"
        >
          <span className="fa-solid fa-robot mr-2"></span>
          Invite Bot!
        </Button>
        <Button
          as="a"
          href="https://discord.com/invite/jzNVh53Kv3"
          auto
          flat
          className="col-6 add-bot-btn btn btn-primary"
        >
          <span className="fa-brands fa-discord mr-2"></span>
          Support Server!
        </Button>
      </div>
    </div>
  );
};

export default InviteSection;
